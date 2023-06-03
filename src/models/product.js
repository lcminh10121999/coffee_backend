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
      Product.belongsTo(models.Category, { foreignKey: "category_id" });
      Product.belongsToMany(models.Size, { foreignKey: "product_id", as: "productSizeData", through: models.Size_Product });
      Product.belongsToMany(models.Topping, { foreignKey: "product_id", as: "productToppingData", through: models.Topping_Product });
      Product.hasMany(models.Cart_Detail, { foreignKey: "product_id", as: "productCartDetailData" });
      Product.hasMany(models.OrderDetail, { foreignKey: "product_id", as: "orderDetailProduct" });
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
    count_sell: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};