const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verifySignUp = require("../middleware/verifySignup");
const validator = require("../config/validationbody");
const { verifyToken } = require("../middleware/authJwt");

// 🔐 Регистрация пользователя
router.post(
  "/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    validator.createUserValidator
  ],
  authController.signup
);

// 🔐 Вход пользователя
router.post(
  "/signin",
  validator.loginValidator,
  authController.signin
);

// 🙋‍♂️ Получить текущего пользователя по токену
router.get("/me", verifyToken, authController.getProfile); 



module.exports = router;
