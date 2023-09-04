'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init({
    nama: {
      type: DataTypes.STRING,
      unique: {
        msg: 'nama must be unique'
      },
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'nama is required'
        }
      }
    },
    gender: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};