const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const upload = multer({ dest: "uploads/" });
const path = require("path");
const db = require("./models"); // включает все модели и sequelize
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const commentRoutes = require("./routes/commentRoutes");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
authRoutes(app); // auth routes через app.use
app.use("/api/articles", articleRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/users", require("./routes/userRoutes"));



// Sync DB and seed roles
const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false }) // true сбросит таблицы
  .then(async () => {
    console.log("DB Connected");

    // Проверим наличие ролей и добавим, если их нет
    const roleCount = await db.Role.count();
    if (roleCount === 0) {
      await db.Role.bulkCreate([
        { name: "admin" }, // id = 1
        { name: "user" }   // id = 2
      ]);
      console.log("Roles initialized");
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });
