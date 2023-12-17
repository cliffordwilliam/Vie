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
