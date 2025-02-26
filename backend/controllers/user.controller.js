const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.userRegister = async (req, res) => {
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
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
};

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id , role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};