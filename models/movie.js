'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User)
    }
  }
  Movie.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    cooming_soon: DataTypes.STRING,
    favorite: DataTypes.STRING,
    rating: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};