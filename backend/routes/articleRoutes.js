const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const userController = require("../controllers/userController");
const multer = require("multer");

// Настройка multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Убедись, что папка uploads существует
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// 🔓 Получить ВСЕ статьи
router.get("/", articleController.getAllArticles);

router.get("/me/articles", verifyToken, userController.getMyArticles);

// 🔓 Получить статью по ID (должен быть до /:slug!)
router.get("/id/:id", articleController.getArticleById);



// 🔓 Получить статью по slug
router.get("/:slug", articleController.getArticle);

// 🔐 Создать статью с изображением
router.post("/", verifyToken, upload.single("image"), articleController.createArticle);

// 🔐 Обновить статью
router.put("/:slug", verifyToken, articleController.updateArticle);

// удалить стаью дляюзера 
router.delete(
  "/my/:slug",
  verifyToken,
  articleController.deleteOwnArticle
);


// 🔐 Удалить статью (только для admin)
router.delete("/:slug", verifyToken, isAdmin, articleController.deleteArticle);

module.exports = router;
