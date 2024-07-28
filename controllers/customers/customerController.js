const db = require("../../models/index");
const Customer = db.models.customer;
const Cart = db.models.cart;

const bcrypt = require("bcryptjs");
const xssFilter = require("xss-filters");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const customer = {
  signUp: async (req, res) => {
    try {
      let { customerName, password } = req.body;

      // Check request body
      if (!(customerName && password)) {
        return res.status(400).json("Customer name and password are required.");
      }

      // Check password length
      if (password.length < 6) {
        return res.status(400).json("Password must be at least 6 characters.");
      }

      // Filter data
      customerName = xssFilter.inHTMLData(customerName);
      password = xssFilter.inHTMLData(password);

      // Ensure no duplicate customer
      let customer = await Customer.findOne({ where: { customerName } });
      if (customer) {
        return res.status(403).json("Customer already exists.");
      }

      // Hash user password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Save to database
      const newCustomer = await Customer.create({
        customerName,
        password: hashedPassword,
      });

      // Create a new cart for the customer (assuming you have a Cart model)
      const newCart = await Cart.create({ customerId: newCustomer.id });

      // Generate JWT token
      let token = jwt.sign({ id: newCustomer.id }, process.env.JWTSECRET);

      // Send response to client
      res.status(201).json({
        token: token,

        id: newCustomer.id,
        customerName: newCustomer.customerName,
      });
    } catch (error) {
    
      res.status(500).json("An internal error occurred , try later please");
    }
  },

  signIn: async (req, res) => {
    try {
      let { customerName, password } = req.body;
      // check fields
      if (!customerName || !password) {
        return res.status(400);
      }

      // Filter data
      customerName = xssFilter.inHTMLData(customerName);
      password = xssFilter.inHTMLData(password);

      // be sure the user is exist
      Customer.findOne({ where: { customerName } }).then((customer) => {
        if (!customer) {
          return res.status(400);
        }

        bcrypt.compare(password, customer.password).then(async (isMatch) => {
          if (!isMatch) {
            return res.status(400);
          } else {
            //sign user
            let token = jwt.sign({ id: customer.id }, process.env.JWTSECRET);

            //send response
            res.status(200).json({
              token,

              id: customer.id,

              customerName: customer.customerName,
            });
          }
        });
      });
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },
  getbyToken: async (req, res) => {
    try {
      let customer = req.app.locals.customer;
      if (!customer) return res.status(400);

      res.status(201).json({
        id: customer.id,

        customerName: customer.customerName,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("An internal error occurred , try later please");
    }
  },
};

module.exports = customer;
