const { Product, User, Cart } = require('../models');

class CartController {
  static getCart(req, res, next) {
    const { id } = req.userData;

    User.findOne({ where: { id }, include: Product })
    .then(data => {
      res.status(200).json(data.Products);
    })
    .catch(err => {
      next(err);
    })
  }

  static addCart(req, res, next) {
    const { ProductId, amount } = req.body;

    Cart.create({
      ProductId,
      UserId: req.userData.id,
      amount
    })
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      next(err);
    })
  }

  static deleteCart(req, res, next) {
    const { id } = req.body;

    Cart.destroy({ where: { id }})
    .then(data => {
      if (data) {
        res.status(200).json({message: 'product deleted'});
      } else {
        next({message: 'NOT FOUND'});
      }
    })
    .catch(err => {
      next(err);
    })
  }
}

module.exports = CartController;