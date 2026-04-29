import { Album, Photo } from '../index.ts';

Album.beforeDestroy(async (album: any, options) => {
  // Buscamos todas las fotos que pertenecen a este álbum
  const albumPhotos = await Photo.findAll({ where: { album_id: album.id } });

  for (const photo of albumPhotos) {
    const data = photo.toJSON();
    // Borramos los archivos físicos del disco de TODAS las fotos del álbum
    if (data.url_full) await Bun.file(data.url_full).delete().catch(() => { });
    if (data.url_thumb) await Bun.file(data.url_thumb).delete().catch(() => { });
  }

  console.log(`🧹 Limpieza de archivos del álbum ${album.id} completada.`);
});