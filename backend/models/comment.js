const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Comment = sequelize.define(
  "Comment",
  {
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "user",
          schema: "articles",
        },
        key: "id",
      },
    },
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "articles",
          schema: "articles",
        },
        key: "id",
      },
    },
  },
  {
    tableName: "comment",
    schema: "articles",
    timestamps: true, // Можно сделать true, если добавишь createdAt/updatedAt
  }
);

module.exports = Comment;
