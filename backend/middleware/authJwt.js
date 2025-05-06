const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;
const Role = db.Role;

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // get Bearer token

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      include: [{ model: Role, as: "role" }],
    });

    if (!user) return res.status(404).send({ message: "User not found!" });

    req.user = user; // 🔥 ключевая строка
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user.role && req.user.role.name === "admin") {
    return next();
  }
  return res.status(403).send({ message: "Require Admin Role!" });
};



module.exports = {
  verifyToken,
  isAdmin,
};
