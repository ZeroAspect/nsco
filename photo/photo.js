const { DataTypes } = require("sequelize");
const db = require("../sequelize/sequelize.js");

const Photos = db.define('Fotos', {
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
  fileName: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false
  }
})

module.exports = Photos