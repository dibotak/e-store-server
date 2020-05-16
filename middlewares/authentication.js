require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

function authentication(req, res, next) {
  const { access_token } = req.headers;

  if (access_token) {
    const decoded = jwt.verify(access_token, secretKey);
    req.userData = decoded;
    next();
  } else {
    next({message: "didn't have access"});
  }
}

module.exports = authentication;