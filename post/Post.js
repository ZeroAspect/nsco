const { DataTypes } = require("sequelize");
const db = require("../sequelize/sequelize.js");

const Post = db.define("Posts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  titulo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  conteudo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fonte: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  post_like: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
})

module.exports = Post;