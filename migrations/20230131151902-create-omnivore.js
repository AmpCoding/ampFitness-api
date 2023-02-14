'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Omnivores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groceryList: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal1: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal2: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal3: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal4: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal5: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
      },
      meal6: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING))
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
    await queryInterface.dropTable('Omnivores');
  }
};