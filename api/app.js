const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 4000;

// DB

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URI}/?&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to Mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });

const routes = require("./routes/userRoutes");
routes(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port);

console.log("Server start", port);

module.exports = app;
