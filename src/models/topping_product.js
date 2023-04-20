'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Topping_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Topping_Product.init({
    product_id: DataTypes.INTEGER,
    topping_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topping_Product',
  });
  return Topping_Product;
};