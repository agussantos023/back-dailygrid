import { DataTypes, Model } from "sequelize";
import db from "../config/database.ts";

export class User extends Model { }
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    google_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    avatar_url: {
      type: DataTypes.STRING
    },
    ticket_balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    notification_time: {
      type: DataTypes.DATE
    },
    light_theme: {
      type: DataTypes.STRING
    },
    dark_theme: {
      type: DataTypes.STRING
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    sequelize: db,
    modelName: "user"
  },
);
