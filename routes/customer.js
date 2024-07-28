const express = require("express");
const router = express.Router();
const customer = require("../controllers/customers/customerController");

const validCustomer = require("../middlewares/auth/customerAuth");

//routes -------------------
router.post("/signUp", customer.signUp);

router.post("/signIn", customer.signIn);
router.get("/getbyToken", validCustomer, customer.getbyToken);

//---------------------------

module.exports = router;
