'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Admin, {
        foreignKey: 'created_by_admin',
        as: 'Admins_create'
      })
      this.belongsTo(models.Admin, {
        foreignKey: 'updated_by_admin',
        as: 'Admins_update'
      })
      this.belongsTo(models.Admin, {
        foreignKey: 'deleted_by_admin',
        as: 'Admins_delete'
      })
      this.belongsTo(models.Superadmin, {
        foreignKey: 'created_by_superadmin',
        as: 'Superadmins_create'
      })
      this.belongsTo(models.Superadmin, {
        foreignKey: 'updated_by_superadmin',
        as: 'Superadmins_update'
      })
      this.belongsTo(models.Superadmin, {
        foreignKey: 'deleted_by_superadmin',
        as: 'Superadmins_delete'
      })
    }
  }
  cars_data.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    size: DataTypes.STRING,
    image: DataTypes.STRING,
    delete: DataTypes.BOOLEAN,
    created_by_admin: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Admin',
        key: "id"
      }
    },
    created_by_superadmin: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Superadmin',
        key: "id"
      }
    },
    updated_by_admin:{ 
      type: DataTypes.INTEGER,
      references:{
        model: 'Admin',
        key: "id"
      }
    },
    updated_by_superadmin:{ 
      type: DataTypes.INTEGER,
      references:{
        model: 'Superadmin',
        key: "id"
      }
    },
    deleted_by_admin: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Admin',
        key: "id"
      }
    },
    deleted_by_superadmin: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Superadmin',
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'cars_data',
  });
  return cars_data;
};