const db = require("../../models/index");

const Order = db.models.order;
const Item = db.models.order_item;
const Product = db.models.product;
const Cart = db.models.cart;
const CartItem = db.models.cart_item;

require("dotenv").config();
const order = {
  // where the user can order products
  create: async (req, res) => {
    try {
      let customerAuth = req.app.locals.customer;
      if (!customerAuth || !customerAuth.id) {
        return res.status(401).json("Unauthorized");
      }
      console.log(customerAuth);

      // Find customer cart
      const cart = await Cart.findOne({
        where: { customerId: customerAuth.id },
      });
      console.log(cart);

      if (!cart) {
        return res.status(404).json("Cart not found");
      }

      const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json("No items in cart");
      }

      console.log("Cart items found:");

      let newOrder = await Order.create({
        customerId: customerAuth.id,
      });
      console.log(newOrder);

      if (!newOrder) {
        return res.status(400).json("Error creating order");
      }

      let totalPrice = 0;
      let totalAmount = 0;

      // Iterate over each item in the "cartItems" array
      for (const cartItem of cartItems) {
        totalPrice += cartItem.totalPrice; // Assuming price per unit
        totalAmount += cartItem.amount;

        const orderItem = await Item.create({
          totalPrice: cartItem.totalPrice, // Assuming price per unit
          ProductId: cartItem.ProductId,
          amount: cartItem.amount,
          orderId: newOrder.id,
        });

        if (!orderItem) {
          return res.status(400).json("Error creating order");
        }

        await CartItem.destroy({ where: { id: cartItem.id } });
      }

      newOrder.totalAmount = totalAmount;
      newOrder.totalPrice = totalPrice;
      await newOrder.save();

      res.status(201).json("Order completed");
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },
  fetchOrderById: async (req, res) => {
    try {
      const customerAuth = req.app.locals.customer;
      if (!customerAuth.id) {
        return res.status(401).json("Unauthorized");
      }

      const id = req.params.id;

      const newOrder = await Order.findOne({
        where: { id },
      });

      let order_items = await Item.findAll({
        where: { orderId: id },
      });

      res.status(200).json({
        order_items,
      });

      // total price is the sum of all Items prices
    } catch (error) {
      if (error) throw error;
    }
  },

  fetchOrders: async (req, res) => {
    try {
      const customerAuth = req.app.locals.customer;
      if (!customerAuth.id) {
        return res.status(401).json("Unauthorized");
      }

      let orders = await Order.findAll({
        where: { customerId: customerAuth.id },
      });

      res.status(200).json({
        orders,
      });
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },
};
module.exports = order;
