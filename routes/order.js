const express = require("express");
const router = express.Router();
const order = require("../controllers/product/orderController");
const validCustomer = require("../middlewares/auth/customerAuth");

//routes -------------------
router.get("/", validCustomer, order.fetchOrders);

router.get("/:id", validCustomer, order.fetchOrderById);
router.post("/create", validCustomer, order.create);

//---------------------------

module.exports = router;
