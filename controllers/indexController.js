const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
//  GET request for index.
// Renders the login form
exports.getLoginPage = (req, res, next) => {
  res.render('login-form');
};

// If valid, sends a token to the header
exports.postLoginPage = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  // Check if a database entry with the username existss
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
      expiresIn: '10m',
    }
  );

  // console.log(token, 'token');

  // Send token as header
  res.header('auth-token', token).json({
    success: true,
    token,
  });
};
