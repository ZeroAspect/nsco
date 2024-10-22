const { DataTypes } = require("sequelize");
const db = require("../sequelize/sequelize.js");

const Comentario = db.define(
  'Comentarios',
  {
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
    conteudo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comment_like: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Posts',
        key: 'id'
      },
      allowNull: false
    }
  }
)

module.exports = Comentario