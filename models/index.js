require("dotenv").config();
const Sequelize = require("sequelize");

//connecting to mysql
const sequelize = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    dialect: process.env.DIALECT,
  }
);

//initializing db object holding db_connection && db_models
let db = {};
db.sequelize = sequelize;
db.models = {};

//require the objects
let customer = require("./Customer")(sequelize, Sequelize.DataTypes);

let cart = require("./cart")(sequelize, Sequelize.DataTypes);

let product = require("./product")(sequelize, Sequelize.DataTypes);

let cart_item = require("./cart_item")(sequelize, Sequelize.DataTypes);
let order_item = require("./order_item")(sequelize, Sequelize.DataTypes);
let order = require("./order")(sequelize, Sequelize.DataTypes);

// //sql relationship here -------------------------------

// user and order
customer.hasOne(cart);

cart.hasMany(cart_item);
cart_item.belongsTo(cart);
cart_item.belongsTo(product);

customer.hasMany(order);

order_item.belongsTo(order);
order_item.belongsTo(product);

// //-----------------------------------------------------

// //add to db models
db.models.customer = customer;
db.models.product = product;

db.models.cart = cart;
db.models.cart_item = cart_item;
db.models.order = order;

db.models.order_item = order_item;

module.exports = db;
