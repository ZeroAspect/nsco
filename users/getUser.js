const { DataTypes } = require("sequelize");
const db = require("../sequelize/sequelize.js");

const User = db.define("Users", {
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
  email: {
    type: DataTypes.TEXT,
    unique: true,
  },
  senha: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = User;