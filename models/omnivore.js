'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Omnivore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Omnivore.init({
    groceryList: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal1: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal2: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal3: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal4: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal5: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    meal6: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
  }, {
    sequelize,
    modelName: 'Omnivore',
  });
  return Omnivore;
};