'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Detail_Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_Detail_Size.belongsTo(models.Cart_Detail, { foreignKey: "cart_detail_id", as: "cartDetailSize", onDelete: 'CASCADE', hooks: true });
    }
  };
  Cart_Detail_Size.init({
    cart_detail_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cart_Detail_Size',
  });
  return Cart_Detail_Size;
};