'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fitness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Fitness.init({
    warmUp: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day1: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day2: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day3: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day4: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day5: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
    day6: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING))
  }, {
    sequelize,
    modelName: 'Fitness',
  });
  return Fitness;
};