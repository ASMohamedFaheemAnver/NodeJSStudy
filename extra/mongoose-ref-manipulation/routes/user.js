const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/get-users", userController.getUsers);
router.post("/create-user/", userController.createUser);
router.delete("/delete-user/:userId", userController.deleteUser);

module.exports = router;
