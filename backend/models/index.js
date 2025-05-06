const sequelize = require("../config/database");
const User = require("./user");
const Article = require("./article");
const Comment = require("./comment");
const Role = require("./role");

// -------- Associations --------

// User → Article
User.hasMany(Article, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});
Article.belongsTo(User, {
  as: "author",
  foreignKey: "author_id",
});

// Article → Comment
Article.hasMany(Comment, {
  as: "comment",
  foreignKey: "article_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(Article, {
  as: "article",
  foreignKey: "article_id",
});

// User → Comment
User.hasMany(Comment, {
  foreignKey: "author_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
  as: "author",
  foreignKey: "author_id",
});

// Role → User
Role.hasMany(User, {
  foreignKey: "role_id",
  onDelete: "CASCADE",
});
User.belongsTo(Role, {
  as: "role",
  foreignKey: "role_id",
});

// -------- Export all models & sequelize --------

module.exports = {
  sequelize,
  User,
  Article,
  Comment,
  Role
};
