const { Product, OrderItem, Order } = require('../models');
const orderitem = require('../models/orderitem');

class OrderController {
  static getCart(req, res, next) {
    const { id } = req.userData;

    Order.findAll({
      where: {
        UserId: id
      },
      include: [ Product ]
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
  }

  static addToCart(req, res, next) {
    const { ProductId, quantity } = req.body;

    Order.create({
      UserId: req.userData.id,
      status: 'on_cart'
    })
    .then(data => {
      // res.status(201).json(data);
      OrderItem.create({
        ProductId,
        quantity,
        OrderId: data.id,
      })
      .then((orderData) => {
        res.status(201).json(data);
      })
      .catch(next);
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
  }

  static deleteFromCart(req, res, next) {
    const { id } = req.body;

    Order.destroy({ where: { id }})
    .then(data => {
      if (data) {
        res.status(200).json({message: 'order deleted'});
      } else {
        next({message: 'NOT FOUND'});
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    })
  }
}

module.exports = OrderController;
