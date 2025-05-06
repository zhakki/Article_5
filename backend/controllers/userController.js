const Article = require("../models/article");
const User = require("../models/user");
const Comment = require("../models/comment");
const asyncHandler = require('express-async-handler');

exports.getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json({ users });
  });

exports.getMyArticles = async (req, res) => {
  try {
    const userId = req.user.id;

    const articles = await Article.findAll({
      where: { author_id: userId },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "username"]
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

    const host = `${req.protocol}://${req.get("host")}`;

    const articlesWithImages = articles.map(article => {
      const plain = article.toJSON();
      if (plain.image) {
        plain.image = host + plain.image;
      }
      return plain;
    });

    res.json({ articles: articlesWithImages });
  } catch (err) {
    console.error("Get My Articles Error:", err);
    res.status(500).json({ message: "Failed to fetch your articles." });
  }
};


