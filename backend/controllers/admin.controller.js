const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  dashboard: async (req, res) => {
    try {
      const user = req.user;
      res.json({ message: `Welcome to the admin dashboard, ${user.name}!` });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports.addCourse = async (req, res) => {
  const { c_name, c_desc, c_price, c_rating } = req.body;
  try {
    const course = await prisma.course.create({
      data: {
        c_name,
        c_desc,
        c_price,
        c_rating,
      },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: 'Unable to add course' });
  }
}
