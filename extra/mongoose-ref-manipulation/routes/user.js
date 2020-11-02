const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/get-users", userController.getUsers);

router.post("/create-user/", userController.createUser);

module.exports = router;
