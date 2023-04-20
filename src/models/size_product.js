'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Size_Product.init({
    product_id: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Size_Product',
  });
  return Size_Product;
};