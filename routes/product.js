const express = require("express");
const router = express.Router();

const product = require("../controllers/product/productController");

//routes

router.get("/", product.fetchProducts);

module.exports = router;
