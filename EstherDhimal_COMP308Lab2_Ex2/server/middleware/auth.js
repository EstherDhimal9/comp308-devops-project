const jwt = require('jsonwebtoken');

const getUserFromToken = (req) => {
  const token = req.cookies.token;

  if (!token) {
    return null;
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { getUserFromToken };