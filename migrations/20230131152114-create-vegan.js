'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Vegans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groceryList: {
        type: Sequelize.ARRAY
      },
      meal1: {
        type: Sequelize.ARRAY
      },
      meal2: {
        type: Sequelize.ARRAY
      },
      meal3: {
        type: Sequelize.ARRAY
      },
      meal4: {
        type: Sequelize.ARRAY
      },
      meal5: {
        type: Sequelize.ARRAY
      },
      meal6: {
        type: Sequelize.ARRAY
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
    await queryInterface.dropTable('Vegans');
  }
};