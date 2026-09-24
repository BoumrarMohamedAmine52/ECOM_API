const express = require("express");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const userControllers = require("../Controllers/userControllers");

const Router = express.Router();

Router.post("/logIn", authMiddelwares.logIn);
Router.post("/signUp", authMiddelwares.signUp);

Router.post("/forgotPassword", authMiddelwares.forgotPassword);
Router.patch("/resetPassword/:resetPassword", authMiddelwares.resetPassword);

Router.patch(
  "/updatePassword",
  authMiddelwares.protect,
  userControllers.updatePassword,
);
