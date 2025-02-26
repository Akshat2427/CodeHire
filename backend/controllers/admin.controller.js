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
