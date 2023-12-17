const Helper = require("../helper");
const { User } = require("../models/index");
const { Op } = require("sequelize");
const Utils = require("../utils");

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
      // GET - no pass
      const user = await User.findOne({
        where: { username },
        attributes: { exclude: ["password"] },
      });
      res.status(201).json({
        status: 201,
        msg: "User successfully created.",
        user,
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
      const { id } = foundUser;
      const payload = { id };
      const token = Helper.payloadToToken(payload);
      // GET - no password
      const user = await User.findOne({
        where: { username },
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        status: 200,
        msg: "Login successful.",
        token,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async get(req, res, next) {
    try {
      // get query
      let { search, searchField, limit, page, sort, sortField } = req.query; // user/?username=
      // limit & page -> offset
      limit = Math.max(parseInt(limit, 10), 1) || 10; // 10 if null or not a number (min 1) always turn to int
      page = Math.max(parseInt(page, 10), 1) || 1; // 1 if null or not a number (min 1) always turn to int
      const offset = (page - 1) * limit;
      // sort -> order
      const order = [[sortField || "username", sort || "asc"]]; // sortField and sort default values
      const allowedSortFields = ["username", "email", "createdAt", "updatedAt"]; //check sortField is valid
      if (!allowedSortFields.includes(order[0][0])) {
        Helper.customError(
          "Invalid sortField. Please use 'username', 'email', 'createdAt', 'updatedAt'.",
          400
        );
      }
      const allowedSort = ["asc", "desc"]; // check sort is valid
      if (!allowedSort.includes(order[0][1])) {
        Helper.customError("Invalid sort. Please use 'asc' or 'desc'.", 400);
      }
      // search & searchField -> query
      search = search || ""; // search default values
      searchField = searchField || "username"; // searchField default values
      const allowedSearchFields = ["username", "email", "bio"]; // check searchField is valid
      if (!allowedSearchFields.includes(searchField)) {
        Helper.customError(
          "Invalid searchField. Please use 'username', 'email' or 'bio'.",
          400
        );
      }
      let query = {};
      if (search) {
        query[searchField] = { [Op.iLike]: `%${search}%` };
      }
      // GET - using (limit,offset,order,query)
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
        limit,
        offset,
        order,
        where: query,
      });
      // res status
      res.status(200).json({
        status: 200,
        msg: `Users successfully retrieved.`,
        users,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getId(req, res, next) {
    try {
      // get params
      const { id } = req.params; // user/id
      // is int?
      Helper.isInt(id, "User ID");
      // GET
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      // not found?
      if (!user) {
        Helper.customError(
          `User not found. No user with the ID ${id} exists.`,
          404
        );
      }
      res.status(201).json({
        status: 200,
        msg: "User successfully retrieved.",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async put(req, res, next) {
    try {
      // get login id
      const { id } = req.loggedInUser;
      // get body
      let { username, password, email, bio } = req.body;
      // PUT
      let [rowsUpdated, [user]] = await User.update(
        {
          username,
          password,
          email,
          bio,
        },
        {
          where: { id },
          returning: true,
        }
      );
      // GET - no password
      user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        status: 200,
        msg: "User successfully updated.",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async patch(req, res, next) {
    try {
      // get login id
      const { id } = req.loggedInUser;
      // get file (need middleware to have .file)
      if (!req.file) {
        Helper.customError("Profile picture image file is required.", 400);
      }
      // req.file -> base64
      const imgBase64 = req.file.buffer.toString("base64");
      // upload base64 and get url
      const result = await Utils.imagekit.upload({
        file: imgBase64,
        fileName: req.file.originalname,
        tags: [`${req.file.originalname}`],
      });
      // imagekit server not working?
      if (!result.url) {
        Helper.customError("Failed to upload the profile picture.", 500);
      }
      // get url
      const profile_picture_url = result.url;
      // PATCH
      const [count, [user]] = await User.update(
        { profile_picture_url },
        {
          where: { id },
          returning: true,
          attributes: { exclude: ["password"] },
        }
      );
      res.status(201).json({
        status: 200,
        msg: "User profile picture successfully updated.",
        user,
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
