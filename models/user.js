'use strict';
const { hashPassword } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {}
  
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot empty',
        },
        isEmail: {
          msg: 'wrong email format'
        }
      },
      unique: {
        msg: 'Email already used!'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'role cannot empty'
        },
        notNull: {
          msg: 'role cannot empty'
        },
        isIn: {
          args: [['admin', 'customer']],
          msg: 'invalid role'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    // User.belongsToMany(models.Product, { through: models.Cart });
  };
  return User;
};