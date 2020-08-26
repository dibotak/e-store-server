'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderItem.init({
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'OrderId cannot empty',
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'ProductId cannot empty',
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'quantity cannot empty',
        min: {
          args: 1,
          msg: 'minimum quantity is 1',
        }
      }
    },
  }, {
    sequelize,
    modelName: 'OrderItem',
  });
  return OrderItem;
};