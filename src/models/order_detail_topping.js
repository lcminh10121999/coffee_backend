'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_Detail_Topping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Detail_Topping.belongsTo(models.OrderDetail, { foreignKey: "order_id", as: "orderDetailTopping" });
    }
  };
  Order_Detail_Topping.init({
    name: DataTypes.STRING,
    order_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_Detail_Topping',
  });
  return Order_Detail_Topping;
};