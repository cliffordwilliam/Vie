"use strict";
const { Model } = require("sequelize");
const Helper = require("../helper");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {}
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // required
        unique: true, // unique
        validate: {
          notNull: { msg: "Username is required." }, // required
          notEmpty: { msg: "Username cannot be empty." }, // required
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false, // required
        validate: {
          len: {
            args: [5, Infinity], // char len min 5
            msg: "Password must be at least 5 characters long.",
          },
          notNull: { msg: "Password is required." }, // required
          notEmpty: { msg: "Password cannot be empty." }, // required
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
      sequelize,
      modelName: "User",
    }
  );

  // Before create hash
  User.beforeCreate(async (user) => {
    const hashedPassword = await Helper.hashPassword(user.password);
    user.password = hashedPassword;
  });

  return User;
};
