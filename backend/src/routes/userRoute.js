const express = require("express");
const userController = require("../controllers/userController");
const userRoute = express();
userRoute.post("/", userController.signUp);
userRoute.post("/login", userController.login);
module.exports = userRoute;
