const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const jsonwebtoken = require("jsonwebtoken");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true);
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
};

// DB connect
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.${process.env.MONGODB_URI}/?&retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connect to Mongo DB Atlas");
  })
  .catch((err) => console.log("err", err));

// Middleware's
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      `${process.env.HASH_PASSWORD}`,
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
const routes = require("./routes/userRoutes");
routes(app);

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log(" Server Start: " + port);

module.exports = app;
