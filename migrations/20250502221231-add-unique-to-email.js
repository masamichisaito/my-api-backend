'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      }),
      queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING(50),
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'age', {
        type: Sequelize.INTEGER,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'hobby', {
        type: Sequelize.STRING(100),
        allowNull: true
      })
    ]);
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.changeColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      }),
      queryInterface.changeColumn('Users', 'name', {
        type: Sequelize.STRING,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'age', {
        type: Sequelize.INTEGER,
        allowNull: false
      }),
      queryInterface.changeColumn('Users', 'hobby', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ]);
  }
};
