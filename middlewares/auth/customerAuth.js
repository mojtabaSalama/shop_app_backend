const jwt = require("jsonwebtoken");
require("dotenv").config();

const validCustomer = (req, res, next) => {
  console.log("connected");
  let token = req.header("token");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    let decoded = jwt.verify(token, process.env.JWTSECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Wrong info" });
    }
    req.customer = decoded;
    req.app.locals.customer = decoded;
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = validCustomer;
