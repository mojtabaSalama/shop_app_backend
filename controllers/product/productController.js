const db = require("../../models/index");
const Product = db.models.product;

const product = {
  fetchProducts: async (req, res) => {
    try {
      const products = await Product.findAll();

      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json("An internal error occurred , try later please");
    }
  },
};
module.exports = product;
