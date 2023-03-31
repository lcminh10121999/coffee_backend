'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.TEXT('long'),
    status: DataTypes.INTEGER,
    inventory: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT('long'),
    category_id: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};