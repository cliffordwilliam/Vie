"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Username is required." },
          notEmpty: { msg: "Username cannot be empty." },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, Infinity],
            msg: "Password must be at least 5 characters long.",
          },
          notNull: { msg: "Password is required." },
          notEmpty: { msg: "Password cannot be empty." },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: { msg: "Invalid email format." },
        },
      },
      profile_picture_url: {
        type: DataTypes.STRING,
        validate: {
          isUrl: { msg: "Invalid image URL format." },
        },
      },
      bio: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [5, Infinity],
            msg: "Bio must be at least 5 characters long.",
          },
        },
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      sequelize,
      modelName: "User",
    }
  );

  // Before create hash
  User.beforeCreate(async (user) => {
    const hashedPassword = await Helper.passwordHasher(user.password);
    user.password = hashedPassword;
  });

  return User;
};
