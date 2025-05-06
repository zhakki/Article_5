const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { verifyToken } = require("../middleware/authJwt");

// 🔐 Создать комментарий к статье
router.post("/:articleId", verifyToken, commentController.createComment);

// 🔐 Обновить комментарий (только автор)
router.put("/:id", verifyToken, commentController.updateComment);

// 🔐 Удалить комментарий (только автор)
router.delete("/:id", verifyToken, commentController.deleteComment);

module.exports = router;
