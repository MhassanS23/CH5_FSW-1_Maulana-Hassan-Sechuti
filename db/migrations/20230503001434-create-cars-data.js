'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cars_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      delete: {
        type: Sequelize.BOOLEAN
      },
      created_by_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Admins"
          },
          key: 'id'
        }
      },
      created_by_superadmin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Superadmins"
          },
          key: 'id'
        }
      },
      updated_by_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Admins"
          },
          key: 'id'
        }
      },
      updated_by_superadmin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Superadmins"
          },
          key: 'id'
        }
      },
      deleted_by_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Admins"
          },
          key: 'id'
        }
      },
      deleted_by_superadmin: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Superadmins"
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cars_data');
  }
};