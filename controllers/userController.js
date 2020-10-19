const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLoginGet = (req, res) => {
  return;
};

// POST the user log in form
// Searches database for username
// If found, unhashes the password and checks if valid
// If valid, sends a token to the header
exports.userLoginPost = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(400).send('Username was not found');
  }
  // Check password
  const validPassword = await bcrypt.compare(password, foundUser.password);
  if (!validPassword) {
    return res.status(400).send('Invalid password');
  }
  // Create and assign json token
  const token = jwt.sign(
    { _id: foundUser._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '20m',
    }
  );
  res.header('auth-token', token).redirect('/');
};
