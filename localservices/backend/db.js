const mg = require("mongoose");

mg.connect(process.env.DB)
  .then(() => console.log("Connection Successful "))
  .catch((error) => console.log(error));
