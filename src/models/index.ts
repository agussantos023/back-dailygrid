import { User } from './User.model.ts';
import { Album } from './Album.model.ts';
import { Photo } from './Photo.model.ts';
import { DataTypes } from 'sequelize';
import db from '../config/database.ts';


export const UserAlbum = db.define('user_album', {
  role: { type: DataTypes.ENUM('admin', 'member'), defaultValue: 'member' },
  joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

// Relaciones N:M
User.belongsToMany(Album, { through: UserAlbum, onDelete: 'CASCADE' });
Album.belongsToMany(User, { through: UserAlbum, onDelete: 'CASCADE' });

// Admin
Album.belongsTo(User, { as: 'admin', foreignKey: 'admin_id' });

// Fotos y sus Cascadas
Photo.belongsTo(User, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' });
Photo.belongsTo(Album, { foreignKey: { name: 'album_id', allowNull: false }, onDelete: 'CASCADE' });

User.hasMany(Photo, { foreignKey: 'user_id' });
Album.hasMany(Photo, { foreignKey: 'album_id' });

export { User, Album, Photo };

import './hooks/user.hooks.ts';
import './hooks/album.hooks.ts';