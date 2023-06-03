'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_Detail.hasOne(models.Cart_Detail_Size, { foreignKey: "cart_detail_id", as: "cartDetailSize", onDelete: 'CASCADE', hooks: true });
      Cart_Detail.hasMany(models.Cart_Detail_Topping, { foreignKey: "cart_detail_id", as: "cartDetailToping", onDelete: 'CASCADE', hooks: true });
      Cart_Detail.belongsTo(models.Product, { foreignKey: "product_id", as: "productCartDetailData" });

    }
  };
  Cart_Detail.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    note: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'Cart_Detail',
  });
  return Cart_Detail;
};