'use strict';

const { Enums } = require('../utils/common');
const { ENABLE, DISABLE } = Enums.COMMENTS;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type : Sequelize.STRING,
        allowNull : false,  
      },
      media: {
        type : Sequelize.STRING,
      },
      userId: {
        type : Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : 'Users',
          key : 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
     },
     comments : {
      type: Sequelize.ENUM,
      values : [ ENABLE, DISABLE ],
      defaultValue: ENABLE,
      allowNull: false,
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
    await queryInterface.dropTable('Posts');
  }
};