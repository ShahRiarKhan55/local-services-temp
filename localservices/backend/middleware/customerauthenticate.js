const jwt = require("jsonwebtoken");
const Customer = require("../model/customer");

const customerauthenticate = async (req, res, next) => {
  try {
    const token = req.cookies.customerLoginToken;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootCustomer = await Customer.findOne({
      id: verifyToken._id,
      " tokens : token ": token,
    });
    if (!rootCustomer) {
      throw new Error(" User not Found ");
    }
    req.token = token;
    req.rootCustomer = rootCustomer;
    req.customerID = rootCustomer._id;
    next();
  } catch (err) {
    res.status(401).send(" Unauthorized : No token provided ");
    console.log(err);
  }
};

module.exports = customerauthenticate;
