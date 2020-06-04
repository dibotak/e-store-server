'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  
  class Cart extends Model {}

  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'UserId cannot empty',
        notNull: 'UserId cannot empty',
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'ProductId cannot empty',
        notNull: 'ProductId cannot empty',
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'amount cannot empty',
        notNull: 'amount cannot empty',
        min: 1,
      }
    },
  }, {
    sequelize,
  });
  Cart.associate = function(models) {
    // associations can be defined here
  };
  return Cart;
};