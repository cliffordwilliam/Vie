"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false, // required
        unique: true, // unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // required
        validate: {
          validate: { len: [5, Infinity] }, // char len min 5
        },
      },
      email: {
        type: Sequelize.STRING,
        unique: true, // unique
        validate: {
          isEmail: true, // isEmail
        },
      },
      profile_picture_url: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true, // isUrl
        },
      },
      bio: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
