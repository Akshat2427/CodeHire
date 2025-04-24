const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { validationResult } = require('express-validator');

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
        if(existingProgress) {
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

