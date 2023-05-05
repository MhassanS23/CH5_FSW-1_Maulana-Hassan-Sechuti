'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.cars_data, {
        foreignKey: 'created_by_admin',
        as: 'Admins_create'
      })
      this.hasMany(models.cars_data, {
        foreignKey: 'updated_by_admin',
        as: 'Admins_update'
      })
      this.hasMany(models.cars_data, {
        foreignKey: 'deleted_by_admin',
        as: 'Admins_delete'
      })
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};