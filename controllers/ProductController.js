const { Product } = require('../models');
const Sequelize = require('sequelize');

class ProductController {
  static getAll(req, res, next) {
		// let params = {
		// 	where: {
		// 		stock: { [Sequelize.Op.gt]: 0 }
		// 	}
		// };
		
		// if (req.userData) {
		// 	let params = {};
		// }

    Product.findAll()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      next(err);
    })
  }

  static addData(req, res, next) {
    const newProduct = req.body;

    Product.create(newProduct)
    .then(product => {
      res.status(201).json(product);
    })
    .catch(err => {
      next(err);
    })
  }

  static editData(req, res, next) {
    const edited = req.body;
    const { id } = req.params;

    Product.update(edited, {where: { id }})
    .then(data => {
      if (data == 1) {
        res.status(200).json({message: 'product updated'});
      } else {
        next({message: 'NOT FOUND'});
      }
    })
    .catch(err => {
      next(err);
    })
  }

  static removeData(req, res, next) {
    const { id } = req.params;

    Product.destroy({where: { id }})
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

module.exports = ProductController;
