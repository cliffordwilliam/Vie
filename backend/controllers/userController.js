const Helper = require("../helper");
const { User } = require("../models/index");

module.exports = class UserController {
  static async post(req, res, next) {
    try {
      // get body
      const { username, password } = req.body;
      // POST
      const postedUser = await User.create({
        username,
        password,
      });
      // GET
      const foundUser = await User.findOne({
        where: { username },
        attributes: { exclude: ["password"] },
      });
      res.status(201).json({
        status: 201,
        msg: "User successfully created.",
        user: foundUser,
      });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      // get body
      const { username, password } = req.body;
      if (!username) {
        Helper.customError("Username is required.", 400);
      }
      if (!password) {
        Helper.customError("Password is required.", 400);
      }
      // username exist?
      const foundUser = await User.findOne({
        where: { username },
      });
      if (!foundUser) {
        throw new Error("User not found. Please check your username.");
      }
      // wrong password?
      if (!(await Helper.comparePassword(password, foundUser.password))) {
        throw new Error("Incorrect password. Please try again.");
      }
      // payload -> token
      const { id, email, profile_picture_url, bio } = foundUser;
      const payload = {
        id,
        email,
        profile_picture_url,
        bio,
        username,
        password,
      };
      const token = Helper.payloadToToken(payload);
      // GET
      const foundUserWithoutPassword = await User.findOne({
        where: { username },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        status: 200,
        msg: "Login successful.",
        token,
        user: foundUserWithoutPassword,
      });
    } catch (error) {
      next(error);
    }
  }

  static async get(req, res, next) {
    try {
      res.status(201).json({
        status: 200,
        msg: "GET.",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      res.status(201).json({
        status: 200,
        msg: "GET.",
      });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      res.status(201).json({
        status: 200,
        msg: "GET.",
      });
    } catch (error) {
      next(error);
    }
  }
  static async patch(req, res, next) {
    try {
      res.status(201).json({
        status: 200,
        msg: "GET.",
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    try {
      res.status(201).json({
        status: 200,
        msg: "GET.",
      });
    } catch (error) {
      next(error);
    }
  }
};
