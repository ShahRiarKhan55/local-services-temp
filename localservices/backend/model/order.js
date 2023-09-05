const mg = require("mongoose");

const order = new mg.Schema({
  orderid: {
    type: Number,
    required: true,
  },
  cusid: {
    type: String,
    required: true,
  },
  customername: {
    type: String,
    required: true,
  },
  customeremail: {
    type: Number,
    required: true,
  },
  customerphone: {
    type: Number,
    required: true,
  },
  ishowed: {
    type: Boolean,
    default: false,
    required: true,
  },
  order: [
    {
      name: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
    },
  ],
  totalamount: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  orderTime: {
    type: Date,
    required: true,
  },
});

const ADDOrder = mg.model("AddOrder", order);

module.exports = ADDOrder;
