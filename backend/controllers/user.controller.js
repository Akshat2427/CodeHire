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
    const user = req.user;
    const courses = await prisma.course.findMany({
        where: {
            c_id: {
                in: user.courseId 
            }
        }
    });
    res.json(courses);
}
