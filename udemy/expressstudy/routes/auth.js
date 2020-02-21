const express = require("express");
const { check, body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/auth");

const User = require("../models/user");

router.get("/login", authController.getLogin);

router.post(
  "/login",
  [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a vaild email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject("Invalid email!");
          }
        });
      })
  ],
  authController.postLogin
);

router.post("/logout", authController.getLogout);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a vaild email!")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              "E-mail exist already, please use another email!"
            );
          }
        });
      }),

    body(
      "password",
      "Please enter password with only numbers and text and at least 5 charecters!"
    )
      .isLength({ min: 5 })
      .trim(),
    // .isAlphanumeric()
    body("confirm_password")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Password have to match!");
        }
        return true;
      })
  ],
  authController.postSignup
);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
