import { DataTypes, Model } from 'sequelize';
import db from '../config/database.ts';

export class Photo extends Model { }
Photo.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  url_full: {
    type: DataTypes.STRING,
    allowNull: false
  },
  url_thumb: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  is_late: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize: db,
  modelName: 'photo'
});