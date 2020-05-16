require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

function hashPassword(pass) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(pass, salt);

  return hash;
}

function comparePassword(pass, hashed) {
  return bcrypt.compareSync(pass, hashed);
}

function generateToken(user) {
  const { id, email } = user;
  return jwt.sign({ id, email }, secretKey);
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken
}