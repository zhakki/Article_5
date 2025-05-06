const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

// 🔹 Создать комментарий
exports.createComment = asyncHandler(async (req, res) => {
  const articleId = req.params.articleId;
  const { body } = req.body;

  if (!body || !body.trim()) {
    return res.status(400).json({ message: "Comment body is required" });
  }

  const article = await Article.findByPk(articleId);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const comment = await Comment.create({
    body,
    author_id: req.user.id,
    article_id: article.id,
  });

  res.status(201).json({ message: "Comment added", comment });
});

// 🔹 Обновить комментарий
exports.updateComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;
  const { body } = req.body;

  if (!body || !body.trim()) {
    return res.status(400).json({ message: "Comment body is required" });
  }

  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author_id !== req.user.id) {
    return res.status(403).json({ message: "You can only update your own comments" });
  }

  comment.body = body;
  await comment.save();

  res.status(200).json({ message: "Comment updated", comment });
});

// 🔹 Удалить комментарий
exports.deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.id;

  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.author_id !== req.user.id) {
    return res.status(403).json({ message: "You can only delete your own comments" });
  }

  await comment.destroy();

  res.status(200).json({ message: "Comment deleted" });
});

