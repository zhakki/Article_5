const verifySignUp = require("../middleware/verifySignup");
const controller = require("../controllers/authController");
const validator = require("../config/validationbody");

module.exports = (app) => {
  // Разрешаем нужные заголовки для CORS
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Роут регистрации
  app.post(
    "/api/auth/signup",
    [
      validator.createUserValidator,
      verifySignUp.checkDuplicateUsernameOrEmail
    ],
    controller.signup
  );

  // Роут входа
  app.post("/api/auth/signin", validator.loginValidator, controller.signin);
};
