const express = require("express");

const router = express.Router();

// const rootDir = require('../util/path');
// console.log(rootDir);

const adminController = require("../controllers/admin");

const isAuth = require("../middleware/is-auth");

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", isAuth, adminController.postAddProduct);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post("/edit-product", isAuth, adminController.postEditProduct);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

router.get("/products", isAuth, adminController.getProducts);

module.exports = router;
