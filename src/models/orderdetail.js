'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, { foreignKey: "order_id", as: "orderDetail" });
      OrderDetail.hasOne(models.Order_Detail_Size, { foreignKey: "order_id", as: "orderDetailSize" });
      OrderDetail.hasMany(models.Order_Detail_Topping, { foreignKey: "order_id", as: "orderDetailTopping" });
      OrderDetail.belongsTo(models.Product, { foreignKey: "product_id", as: "orderDetailProduct" });
    }
  };
  OrderDetail.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    note: DataTypes.TEXT('long')
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};