'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie)
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options) {
        const hashedPasswords = hashPassword(instance.password)
        instance.password = hashedPasswords
      }
    }
  });
  return User;
};