'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address_Book.belongsTo(models.User, { foreignKey: "user_id", as: "addressBookUser" });
    }
  };
  Address_Book.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT('long'),
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    city_code: DataTypes.INTEGER,
    city_name: DataTypes.STRING,
    districts_code: DataTypes.INTEGER,
    districts_name: DataTypes.STRING,
    wards_code: DataTypes.INTEGER,
    wards_name: DataTypes.STRING,
    specific_address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Address_Book',
  });
  return Address_Book;
};