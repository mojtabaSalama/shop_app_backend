const express = require("express");
const router = express.Router();

const product = require("../controllers/product/productController");

//routes

router.get("/fetch", product.fetchProducts);

module.exports = router;
