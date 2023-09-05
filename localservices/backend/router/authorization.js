const express = require("express");
const bcrypt = require("bcryptjs");
const Customer = require("../model/customer");
const Order = require("../model/order");
const router = express.Router();

//------------------------------------CUSTOMER PANEL--------------------------------------------//
router.post("/customer_register", async (req, res) => {
  const { name, email, phone, password, cpassword } = req.body;
  if (!name || !email || !phone || !password || !cpassword) {
    return res.status(422).json("422");
  }

  if (password === cpassword) {
    try {
      const customerExist = await Customer.findOne({ email });
      if (customerExist) {
        return res.status(423).json("423");
      }

      const newCustomer = new Customer({ name, email, phone, password });
      await newCustomer.save();
      return res.status(200).json("200");
    } catch (err) {
      console.log("Error with", err);
    }
  } else {
    return res.status(425).json("425");
  }
});

router.post("/customer_login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json("404");
    }

    const customerLogin = await Customer.findOne({ email });

    if (customerLogin) {
      const matchpass = await bcrypt.compare(password, customerLogin.password);

      if (matchpass) {
        let token = await customerLogin.generateCustomerToken();
        res.cookie("customerLoginToken", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        });

        return res.status(200).json(customerLogin);
      } else {
        return res.status(405).json("405");
      }
    } else {
      return res.status(406).json("406");
    }
  } catch (err) {
    console.log("Error", err);
  }
});

router.post("/customer_logout", (req, res) => {
  res.clearCookie("customerLoginToken", { path: "/" });
  return res.status(200).json("Logged out");
});

router.get("/showprofile", async (req, res) => {
  try {
    const customer = await Customer.find();
    res.send(JSON.stringify(customer));
  } catch (err) {
    console.log(err);
  }
});

router.post("/updateProfile", async (req, res) => {
  console.log(req.body);
  const { name, email, phone, password, _id } = req.body;
  try {
    const update = await customer.findByIdAndUpdate(
      { _id },
      {
        $set: {
          name,
          email,
          phone,
          password,
        },
      },
      {
        new: true,
      }
    );
    return res.status(200).json("200");
  } catch (err) {
    return res.status(400).json("400");
  }
});

//------------------------------------ORDER SIDE--------------------------------------------//
router.post("/addOrder", async (req, res) => {
  const {
    order,
    totalamount,
    customername,
    cusid,
    customeremail,
    customerphone,
  } = req.body;
  const orderDate = new Date();
  const orderTime = new Date().getTime();
  const orderid = Math.floor(Math.random() * 1000000 + 1);
  try {
    const newOrder = Order.insertMany({
      order: order.orders,
      orderDate,
      orderTime,
      totalamount,
      customername,
      cusid,
      customeremail,
      customerphone,
      orderid,
    });
    return res.status(200).json("200");
  } catch (err) {
    return res.status(404).json("404");
  }
});

router.get("/showorders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(JSON.stringify(orders));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
