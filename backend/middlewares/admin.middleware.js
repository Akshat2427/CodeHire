const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { u_id: decoded.userId } });
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = adminAuth;
