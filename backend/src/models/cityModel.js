import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const CityModel = sequelize.define(
  "city",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name"
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "AR",
      field: "country"
    },
  },
  {
    timestamps: false,
  }
);