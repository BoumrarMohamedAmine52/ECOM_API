const express = require("express");
const authMiddelwares = require("../Middelwares/authMiddelwares");
const userControllers = require("../Controllers/userControllers");

const Router = express.Router();
Router.get("/", userControllers.allUsers);

Router.route("/:id")
  .get(userControllers.getUser)
  .patch(
    authMiddelwares.protect,
    userControllers.setUpdateFields,
    userControllers.updateUser,
  );

Router.patch(
  "/deActive/:id",
  authMiddelwares.protect,
  userControllers.setIsActiveUser,
  userControllers.deActivateUser,
);

Router.post("/logIn", authMiddelwares.logIn);
Router.post("/signUp", authMiddelwares.signUp);

Router.post("/forgotPassword", authMiddelwares.forgotPassword);
Router.patch("/resetPassword/:resetPassword", authMiddelwares.resetPassword);

Router.patch(
  "/updatePassword",
  authMiddelwares.protect,
  userControllers.updatePassword,
);
