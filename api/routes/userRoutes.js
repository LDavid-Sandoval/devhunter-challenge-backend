module.exports = function (app) {
  const userHandlers = require("../controllers/userController");

  //routes
  app.route("/api/register").post(userHandlers.register);
};
