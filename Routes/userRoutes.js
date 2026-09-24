const express = require("express");
const authMiddelwares = require("../Middelwares/authMiddelwares");

const Router = express.Router();

Router.get("/logIn", authMiddelwares.logIn);
