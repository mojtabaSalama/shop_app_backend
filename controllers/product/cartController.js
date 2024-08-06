const db = require("../../models/index");

const Cart = db.models.cart;
const CartItem = db.models.cart_item;

const Product = db.models.product;

require("dotenv").config();
const cart = {
  Add_to_cart: async (req, res) => {
    try {
      const customerAuth = req.app.locals.customer;
      if (!customerAuth || !customerAuth.id) {
        return res.status(401).json("Unauthorized");
      }

      const id = req.params.id; // Get the product ID from URL parameters
      console.log(id);

      if (!id) {
        return res.status(400).json("Please enter the product ID");
      }

      const product = await Product.findOne({ where: { id: id } });

      if (!product) {
        return res.status(404).json("Product not found");
      }
      const cart = await Cart.findOne({
        where: { customerId: customerAuth.id },
      });

      if (!cart) {
        return res.status(404).json("Cart not found");
      }
      const cart_item = await CartItem.findOne({
        where: { ProductId: id, cartId: cart.id },
      });
      if (cart_item) {
        return res.status(404).json("Item is already in the cart");
      }
      // Create order in database
      const newItem = await CartItem.create({
        totalPrice: product.price,
        ProductId: id,
        amount: 1,
        cartId: cart.id, // Assuming you have a customerId field
      });

      return res.status(201).json("Item added to cart successfully");
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },

  fetchCart: async (req, res) => {
    //authintication
    const customerAuth = await req.app.locals.customer;
    if (!customerAuth.id) {
      return res.status(401).json("Unauthorized");
    }

    //find customer cart
    const cart = await Cart.findOne({
      where: { customerId: customerAuth.id },
    });

    if (!cart) {
      return res.status(401).json("error");
    }
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });
    let totalPrice = 0;
    for (const cartItem of cartItems) {
      totalPrice += cartItem.totalPrice;
    }

    //response
    return res.status(200).json({ cartItems, totalPrice });
  },
  updateAmount: async (req, res, next) => {
    try {
      const customerAuth = req.app.locals.customer;
      if (!customerAuth) {
        return res.status(401).json("Unauthorized");
      }

      const id = req.params.id;
      const { amount } = req.body;
      if (!(id && amount)) {
        return res.status(400).json("Please enter the item  ID");
      }

      const cart = await Cart.findOne({
        where: { customerId: customerAuth.id },
      });

      if (!cart) {
        return res.status(404).json("Cart not found");
      }

      const cart_item = await CartItem.findOne({
        where: { id, cartId: cart.id },
      });

      if (!cart_item) {
        return res.status(404).json("Product not found in the cart");
      }

      const product = await Product.findOne({
        where: { id: cart_item.ProductId },
      });

      cart_item.amount = amount;

      cart_item.totalPrice = amount * product.price;
      await cart_item.save();

      res.status(200).json("updated");
    } catch (error) {
      console.log(error);
    }
  },

  remove_from_cart: async (req, res, next) => {
    try {
      const customerAuth = req.app.locals.customer;
      if (!customerAuth || !customerAuth.id) {
        return res.status(401).json("Unauthorized");
      }

      const id = req.params.id; // Get the product ID from URL parameters
      console.log(id);

      if (!id) {
        return res.status(400).json("Please enter the product ID");
      }

      const cart = await Cart.findOne({
        where: { customerId: customerAuth.id },
      });

      if (!cart) {
        return res.status(404).json("Cart not found");
      }

      const cart_item = await CartItem.findOne({
        where: { ProductId: id, cartId: cart.id },
      });

      if (!cart_item) {
        return res.status(404).json("Product not found in the cart");
      }

      await CartItem.destroy({ where: { id: cart_item.id } });

      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },
};
module.exports = cart;
