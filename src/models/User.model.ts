import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import db from "../config/database.ts";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare google_id: string;
  declare email: string;
  declare username: string;
  declare avatar_url: string | null;
  declare ticket_balance: CreationOptional<number>;
  declare notification_time: string | null;
  declare light_theme: string | null;
  declare dark_theme: string | null;
  declare refresh_token: string | null;
}

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
      type: DataTypes.STRING(5)
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
