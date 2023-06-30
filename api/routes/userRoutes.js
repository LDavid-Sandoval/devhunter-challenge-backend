module.exports = function (app) {
  const userHandlers = require("../controllers/userController.js");
  // todoList Routes
  app
    .route("/api/profile")
    .post(userHandlers.loginRequired, userHandlers.profile);
  app.route("/api/register").post(userHandlers.register);
  app.route("/api/login").post(userHandlers.sign_in);
};
