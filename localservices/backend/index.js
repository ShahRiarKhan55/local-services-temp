const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

require("./db");
app.use(express.json());
app.use(require("./router/authorization")); //linking the router file to be in use
app.get("/", (req, res) => {
  res.send(`Hello, this is backend`);
});

app.get("/customer_login", (req, res) => {
  res.send(`Logged in`);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
