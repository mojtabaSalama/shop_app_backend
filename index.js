const express = require("express");
const app = express();

const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
require("dotenv").config();

// Connect to the database
(async () => {
  try {
    await db.sequelize.sync({});
    //alter: true
    console.log("Connected to MySQL");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static("public/images"));
app.use(bodyParser.json());

// Log each request to the console
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Setting up routes
app.use("/api/customer", require("./routes/customer"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/order"));

// Catch 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "URL Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

//working in port 4000
const Port = process.env.PORT || 4000;
app.listen(Port, () => console.log(`Server running on port ${Port}`));
