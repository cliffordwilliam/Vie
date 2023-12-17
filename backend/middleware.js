const Helper = require("./helper");
const { User } = require("./models/index");

module.exports = class Middleware {
  static handleError(err, req, res, next) {
    console.log(err);
    switch (err.name) {
      case "SequelizeValidationError":
        return res
          .status(400)
          .json({ error: { status: 400, msg: err.errors[0].message } });
      case "SequelizeUniqueConstraintError":
        return res
          .status(400)
          .json({ error: { status: 400, msg: err.errors[0].message } });
      case "JsonWebTokenError":
        return res
          .status(401)
          .json({ error: { status: 401, msg: err.message } });
      case "CustomError":
        return res
          .status(err.status)
          .json({ error: { status: err.status, msg: err.msg } });
      default:
        return res
          .status(500)
          .json({ error: { status: 500, msg: "Internal Server Error." } });
    }
  }

  static async tokenGuard(req, res, next) {
    try {
      // no token? throw
      if (!req.headers.authorization)
        Helper.customError(
          "Unauthorized. A valid bearer token is required for access.",
          401
        );
      // get token
      const token = req.headers.authorization.split(" ")[1];
      // token -> payload
      const payload = await Helper.tokenToPayload(token);
      // payload user dont exists? throw
      const foundUser = await User.findOne({
        where: { username: payload.username },
      });
      if (!foundUser) {
        Helper.customError("Unauthorized. Your access token is invalid.", 401);
      }
      // save user data to req.loggedInUser
      req.loggedInUser = foundUser;
      next();
    } catch (error) {
      next(error);
    }
  }
};
