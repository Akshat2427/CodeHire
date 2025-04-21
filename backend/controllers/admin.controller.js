const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  dashboard: async (req, res) => {
    try {
      const user = req.user;
      res.json({ message: `Welcome to the admin dashboard, ${user.name}!` });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
  addCourse: async (req, res) => {
    const { c_id, c_name, c_desc, c_price, c_rating, category, logo, stageCount } = req.body;
    const price = parseFloat(c_price);
    const rating = parseFloat(c_rating);
    const stages = parseInt(stageCount);
    try {
      const course = await prisma.course.create({
        data: {
          c_id,
          c_name,
          c_desc,
          c_price: price,
          c_rating: rating,
          category,
          logo,
          stageCount: stages,
        },
      });
      console.log("Course added:", course);
      res.status(201).json(course);
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Unable to add course' });
    }
  },
  userCourses : async (req, res) => {
    const courses = await prisma.course.findMany();
    res.json(courses);
}
};

