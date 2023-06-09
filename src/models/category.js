'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, { foreignKey: "category_id" });
    }
  };
  Category.init({
    name: DataTypes.STRING,
    status: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.TEXT('long'),
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};