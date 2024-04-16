const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    win: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    lose: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
    tie: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Score;
