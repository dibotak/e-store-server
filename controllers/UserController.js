const { User } = require('../models');
const { comparePassword, generateToken } = require('../helpers');

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body;
    const role = req.userRole;

    User.create({ email, password, role })
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      next(err);
    })
  }

  static login(req, res, next) {
    const { email, password } = req.body;

    User.findOne({where: { email }})
    .then(user => {
      if (user && comparePassword(password, user.password)) {
        const access_token = generateToken(user);
        res.status(201).json({ access_token });
      } else {
        next({message: 'WRONG'});
      }
    })
    .catch(err => {
      next(err);
    })
  }
}

module.exports = UserController;