const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class Helper {
  static customError(msg, status) {
    throw { name: "CustomError", msg, status };
  }

  static async hashPassword(value) {
    try {
      return await bcrypt.hash(value, 10);
    } catch (error) {
      throw error;
    }
  }

  static async comparePassword(receivedTypedPassword, databaseHashedPassword) {
    try {
      return await bcrypt.compare(
        receivedTypedPassword,
        databaseHashedPassword
      );
    } catch (error) {
      throw error;
    }
  }

  static payloadToToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
  }

  static tokenToPayload(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  static isInt(input, name) {
    const value = parseInt(input, 10);
    if (isNaN(value) || value !== parseFloat(input)) {
      Helper.customError(`${name} must be a valid integer.`, 400);
    }
  }

  static isStr(input, name) {
    const value = parseInt(input, 10);
    if (!isNaN(value)) {
      Helper.customError(`${name} must be a string.`, 400);
    }
  }
};
