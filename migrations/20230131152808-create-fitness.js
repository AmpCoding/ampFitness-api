'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fitnesses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      warmUp: {
        type: Sequelize.ARRAY
      },
      day1: {
        type: Sequelize.ARRAY
      },
      day2: {
        type: Sequelize.ARRAY
      },
      day3: {
        type: Sequelize.ARRAY
      },
      day4: {
        type: Sequelize.ARRAY
      },
      day5: {
        type: Sequelize.ARRAY
      },
      day6: {
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
    await queryInterface.dropTable('Fitnesses');
  }
};