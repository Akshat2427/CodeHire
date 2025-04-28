const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const { formatGeminiText } = require('../services/formatGeminitext');

const genAI = new GoogleGenerativeAI("AIzaSyDeLI_3d47Upy22AXdyFLWInv3V41jy3WE");

module.exports.userRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role ? role : 'STUDENT',
            },
        });
        const token = jwt.sign({ userId: user.u_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
};

module.exports.userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.u_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);
    // console.log(user);
    res.json({ token, user });
};

module.exports.userProfile = async (req, res) => {
    const user = req.user;
    res.json(user);
}

module.exports.userLogout = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    const expiresAt = new Date(Date.now() + 86400 * 1000);
    try {
        await prisma.blacklistedToken.create({
            data: {
                token,
                expiresAt
            }
        })
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports.userSaveCourse = async (req, res) => {
    const { courseId } = req.params;
    const course = await prisma.course.findUnique({ where: { c_id: courseId } });
    //add courseID to user
    await prisma.user.update({
        where: { u_id: req.user.u_id },
        data: { courseId: { push: courseId } }
    });
    res.json(course);
}

module.exports.userMyCourses = async (req, res) => {
    const userId = req.user.u_id;

    const enrolledCourses = await prisma.courseProgress.findMany({
        where: { u_id: userId },
        select: { c_id: true }
    });

    res.json(enrolledCourses.map(c => c.c_id));
}

module.exports.userCourses = async (req, res) => {
    const courses = await prisma.course.findMany();
    res.json(courses);
}

module.exports.userCourse = async (req, res) => {
    const { id } = req.params;
    const course = await prisma.course.findUnique({ where: { c_id: id } });
    res.json(course);
}

module.exports.userEnrollCourse = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.u_id;
    try {
        const existingProgress = await prisma.courseProgress.findFirst({
            where: {
                c_id: id,
                u_id: userId,
            },
        });
        if (existingProgress) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }

        const progress = await prisma.courseProgress.create({
            data: {
                c_id: id,
                u_id: userId,
                current_round: 'Resume',
                progress_percentage: 0,
                scores: [],
            }
        });
        res.json(progress);
    } catch (error) {
        res.status(400).json({ error: 'Enrollment failed' });
    }
}

module.exports.userSavedCourses = async (req, res) => {
    const user = req.user;
    const savedCourses = await prisma.course.findMany({
        where: {
            c_id: {
                in: user.courseId
            }
        }
    });
    res.json(savedCourses);
}

module.exports.getResumeKeywords = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.u_id;
    try {
        const progress = await prisma.resume.findFirst({
            where: {
                c_id: id,
            },
        });
        if (!progress) {
            return res.status(404).json({ error: 'Progress not found' });
        }
        // console.log(progress)
        res.json(progress.r_key_words);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports.uploadResume = async (req, res) => {
    const { id } = req.params;
    const file = req.file;
    const keywords = JSON.parse(req.body.keywords);
    if (!file) {
        return res.status(400).json({ status: "error", message: "No file uploaded." });
    }

    try {
        const fileBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(fileBuffer);
        const extractedText = pdfData.text;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
            Analyze this resume based on the following extracted text.
            Provide a score out of 100 based on how well it matches these given keywords: ${keywords}.
            only provide the score like this: marks/100
            be real with it dont give it very high if it is not good
            Dont give too low or too high

            Here is the resume text:
            ${extractedText}
        `;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const geminiText = response.text();
        const newtext = formatGeminiText(geminiText)
        res.status(200).json({
            status: "success",
            message: "Resume analyzed successfully.",
            analysis: newtext
        });
    } catch (error) {
        console.error("Error analyzing resume:", error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong while analyzing the resume."
        });

    }
}

module.exports.updateProgress = async (req,res)=>{
    const {id} = req.params;
    const {current_round, progress_percentage, scores} = req.body;
    try{
        const progress = await prisma.courseProgress.update({
            where: {
                u_id_c_id: {
                  u_id: req.user.u_id,
                  c_id: id
                }
            },
            data:{
                current_round,
                progress_percentage,
                scores
            }
        })
        res.json(progress);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Server error'});
    }
}


module.exports.getCurrentRound = async (req,res)=>{
    const {id} = req.params;
    try{
        const progress = await prisma.courseProgress.findFirst({
            where:{
                c_id: id,
                u_id: req.user.u_id
            }
        })
        if(!progress){
            return res.status(404).json({error: 'Progress not found'});
        }
        return res.json(progress);
    }
    catch(err){
        res.status(500).json({error: 'Server error'});
    }
}


module.exports.getDashboardDetails = async (req,res)=>{
    //show total courses, total completed, total uncompleted, hours spent
    const userId = req.user.u_id;
    try{
        const totalCourses = await prisma.courseProgress.count({
            where: { u_id: userId }
          });
          
        const completedCourses = await prisma.courseProgress.count({
            where:{
                u_id: userId,
                progress_percentage: 100
            }
        })
        const uncompletedCourses = totalCourses - completedCourses;
        // const hoursSpent = await prisma.courseProgress.aggregate({
        //     where:{
        //         u_id: userId
        //     },
        //     _sum:{
        //         progress_percentage: true
        //     }
        // })
        res.json({totalCourses, completedCourses, uncompletedCourses});//, hoursSpent: hoursSpent._sum.progress_percentage});
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: 'Server error'});
    }    

}



// app.post('/forgot-password',async (req,res)=>{

//     const {email} = req.body;
//     try{
//         const user = await UserActivation.findOne({email});
//         if(!user){
//             return res.message('User doesnnt exist');
//         }

//         const token = await user.generateToken();
//         user.resetToken = token;
//         user.tokenExpiry = Date.now()+3600000;
//         await user.save();

//         const transporter = nodemailer.createTransport({
//             service:"gmail",
//             auth:{
//                 user:"",
//                 pass:""
//             }
//         });
//         const mailMsg ={
//             from:"",
//             to:"",
//             subject:"",
//             html:""
//         }
//         await transporter.sendMail(mailMsg);
//     }
//     catch(err){
//         res.json({'message':err.message});
//     }
// })

