import { DataTypes, Model } from 'sequelize';
import db from '../config/database.ts';

export class Album extends Model { }
Album.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invite_code: {
    type: DataTypes.STRING(4),
    unique: true,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'album'
});