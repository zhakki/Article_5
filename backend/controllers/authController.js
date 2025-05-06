const db = require("../models");
const { validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const User = require("../models/user")
const Role = require("../models/role")
const jwt = require("jsonwebtoken");



const signup = async (req, res) => {
  // Валидация полей
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { email, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const newUser = await User.create({
      email,
      username,
      password, // хешируется автоматически, стоит hook
    });

    await newUser.setRole(2); // роль "user", если создана раньше

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Найдём пользователя по email и загрузим роль
    const user = await User.findOne({
      where: { email },
      include: [{ model: Role, as: "role" }]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Сравниваем пароли
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Генерируем токен
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token, // <== Вот здесь высылается токен
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role.name
      }
    });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


const getProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role?.name || "user"
  });
};

module.exports = { signup, signin, getProfile };




