const jwt = require('jsonwebtoken');

let token;

exports.addToken = (userToken) => {
  token = userToken;
};

exports.printToken = () => {
  console.log(token);
};

exports.verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  console.log(token, 'token');
  if (!token) {
    return res.status(401).json({
      success: false,
    });
  }
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Invalid/expired token',
    });
  }
};

exports.clearToken = (req, res, next) => {
  res.header('auth-token', '');
  next();
};
