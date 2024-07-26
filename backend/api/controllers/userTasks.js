const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.email, isadmin: user.isadmin }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    res.status(200).json({msg: "Your signed in! ", token: token });
  } catch (error) {
    console.error(`Error logging in user: ${error.message}`);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  createUser,
  loginUser,
};
