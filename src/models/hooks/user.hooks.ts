import { User, Album, Photo, UserAlbum } from '../index.ts';
import { Op, Sequelize } from 'sequelize';

User.beforeDestroy(async (user: any, options) => {
  const userId = user.id;

  // SUCESIÓN DE MANDATO
  const managedAlbums = await Album.findAll({ where: { admin_id: userId } });

  for (const album of managedAlbums) {
    const nextMember: any = await UserAlbum.findOne({
      where: { album_id: (album as any).id, user_id: { [Op.ne]: userId } },
      order: Sequelize.literal('RAND()')
    });

    if (nextMember) {
      await album.update({ admin_id: nextMember.user_id }, { transaction: options.transaction });
      await nextMember.update({ role: 'admin' }, { transaction: options.transaction });
    } else {
      // Si el admin es el último, destruimos el álbum. 
      // Esto disparará automáticamente el hook de Album
      await album.destroy({ transaction: options.transaction });
    }
  }

  // LIMPIEZA FÍSICA
  const photos = await Photo.findAll({ where: { user_id: userId } });
  for (const photo of photos) {
    const data = photo.toJSON();
    if (data.url_full) await Bun.file(data.url_full).delete().catch(() => { });
    if (data.url_thumb) await Bun.file(data.url_thumb).delete().catch(() => { });
  }
});