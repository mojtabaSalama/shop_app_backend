const express = require("express");
const router = express.Router();

//controller
const cart = require("../controllers/product/cartController");
//midelware
const validCustomer = require("../middlewares/auth/customerAuth");

// Routes
router.get("/", validCustomer, cart.fetchCart);
router.post("/add/:id", validCustomer, cart.Add_to_cart);
router.post("/remove/:id", validCustomer, cart.remove_from_cart);
router.post("/update/:id", validCustomer, cart.updateAmount);
router.post("/item/:id", validCustomer, cart.cart_item_by_id);

module.exports = router;
