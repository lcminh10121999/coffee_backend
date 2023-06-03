'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Cart, { foreignKey: "user_id", as: "cartUser" });
      User.hasMany(models.Address_Book, { foreignKey: "user_id", as: "addressBookUser" });
    }
  };
  User.init({
    name: DataTypes.STRING,
    birthday: DataTypes.DATE,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.INTEGER,
    gender: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};