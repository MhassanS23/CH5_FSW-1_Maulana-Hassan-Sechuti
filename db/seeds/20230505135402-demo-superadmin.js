'use strict';
const bcrypt = require("bcryptjs");

const encryptPassword = async (password) => {
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword;
  } catch (error) {
    return error;
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const password = await encryptPassword('messi123')

    return queryInterface.bulkInsert('Superadmins', [{
      name: 'Lionel Andres Messi',
      email: 'lionelmessi@gmail.com',
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Superadmins', null, {});
  }
};
