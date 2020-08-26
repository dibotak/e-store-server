'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  
  class Order extends Model {}

  Order.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: 'UserId cannot empty',
        notNull: 'UserId cannot empty',
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: 'status cannot empty',
        notNull: 'status cannot empty',
      }
    },
  }, {
    sequelize,
  });
  Order.associate = function(models) {
    // associations can be defined here
    Order.belongsToMany(models.Product, { through: models.OrderItem });
    Order.belongsTo(models.User);
  };
  return Order;
};