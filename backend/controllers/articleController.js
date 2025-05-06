const path = require("path");
const fs = require("fs");
const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");

exports.createArticle = async (req, res) => {
  try {
    const { title, description, body } = req.body;
    console.log("Parsed title:", req.body.title);
    console.log("Body:", req.body);
    console.log("File:", req.file);

    if (!title) {
      throw new Error("Title is missing");
    }

    const slug = slugify(title, { lower: true });
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const article = await Article.create({
      title,
      description,
      body,
      slug,
      author_id: req.user.id,
      image: imagePath,
    });

    res.status(201).json(article);
  } catch (err) {
    console.log("Request body:", req.body);
    console.error("Create Article Error:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.findAll({
    attributes: { exclude: ["author_id"] },
    include: [
      {
        model: User,
        as: "author",
        attributes: { exclude: ["password", "email", "role_id"] }
      },
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username"]
          }
        ]
      }
    ],
    order: [["createdAt", "DESC"]]
  });

  const hostUrl = `${req.protocol}://${req.get("host")}`;

  const articlesWithImageUrl = articles.map(article => {
    const plain = article.toJSON();
    if (plain.image) {
      plain.image = hostUrl + plain.image;
    }
    return plain;
  });

  res.status(200).json({ articles: articlesWithImageUrl });
});

exports.getArticleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByPk(id, {
    include: [
      { model: User, as: "author", attributes: ["id", "username"] },
      {
        model: Comment,
        as: "comment",
        attributes: ["body"],
        include: [{ model: User, as: "author", attributes: ["username"] }],
      },
    ],
  });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  res.status(200).json({ article });
});

// удалить статью админу 
exports.deleteArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const article = await Article.findOne({ where: { slug } });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const isAuthor = article.author_id === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isAuthor && !isAdmin) {
    return res.status(403).json({ message: "Only the author or an admin can delete this article" });
  }

  if (article.image) {
    const imagePath = path.join(__dirname, "..", article.image);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete image:", err.message);
    });
  }

  await article.destroy();

  res.status(200).json({ message: "Article deleted successfully" });
});



// удалить статью пользователю 

exports.deleteOwnArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const article = await Article.findOne({ where: { slug } });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  if (article.author_id !== req.user.id) {
    return res.status(403).json({ message: "You can only delete your own articles" });
  }

  await article.destroy();

  res.status(200).json({ message: "Your article has been deleted" });
});




exports.updateArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const { title, description, body } = req.body;

  const article = await Article.findOne({ where: { slug } });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const isAuthor = article.author_id === req.user.id;
  const isAdmin = req.user.role === "admin";

  if (!isAuthor && !isAdmin) {
    return res.status(403).json({ message: "Only the author or an admin can update this article" });
  }

  if (title) {
    article.title = title;
    article.slug = slugify(title, { lower: true });
  }
  if (description) article.description = description;
  if (body) article.body = body;

  await article.save();

  res.status(200).json({ message: "Article updated successfully", article });
});


exports.getArticle = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const article = await Article.findOne({
    where: { slug },
    include: [
      {
        model: User,
        as: "author",
        attributes: ["id", "username"]
      },
      {
        model: Comment,
        as: "comment",
        attributes: ["id", "body", "author_id"],
        include: [
          {
            model: User,
            as: "author",
            attributes: ["id", "username"]
          }
        ]
      }
    ]
  });

  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  // Преобразуем в JSON и добавим полный путь к изображению
  const plain = article.toJSON();
  if (plain.image) {
    const hostUrl = `${req.protocol}://${req.get("host")}`;
    plain.image = hostUrl + plain.image;
  }

  res.status(200).json({ article: plain });
});
