'use strict';

/** @type {import('sequelize-cli').Migration} */
// migrations/xxxx-add-isTestData-to-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'isTestData', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'isTestData');
  }
};

