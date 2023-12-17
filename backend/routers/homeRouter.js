const express = require("express");

//child router
const userRouter = require("./userRouter");

// guards
const Middleware = require("../middleware");

// get controllers
const UserController = require("../controllers/userController");

// craete router
const homeRouter = express.Router();

// free
homeRouter.post("/user", UserController.post);
homeRouter.post("/user/login", UserController.login);

// token guard
homeRouter.use(Middleware.tokenGuard);
// homeRouter.use("/user", userRouter);

// exports
module.exports = homeRouter;
