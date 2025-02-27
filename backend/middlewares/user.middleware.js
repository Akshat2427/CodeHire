const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const blacklistedToken = await prisma.blacklistedToken.findUnique({ where: { token } });
        if (blacklistedToken && new Date() < new Date(blacklistedToken.expiresAt)) {
            return res.status(401).json({ error: 'Token is blacklisted' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}