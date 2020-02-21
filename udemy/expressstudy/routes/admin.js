const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

// const rootDir = require('../util/path');
// console.log(rootDir);

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/add-product => POST
router.post(
  "/add-product",
  isAuth,
  [
    body("title")
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl").isURL(),
    body("price").isNumeric(),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  isAuth,
  [
    body("title")
      .isAlphanumeric()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl").isURL(),
    body("price").isNumeric(),
    body("description")
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

router.get("/products", isAuth, adminController.getProducts);

module.exports = router;
