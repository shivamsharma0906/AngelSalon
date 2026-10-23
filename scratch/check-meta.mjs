import sharp from 'sharp';

async function check() {
  const m1 = await sharp('public/images/backup_originals/interior_studio_floor.webp').metadata();
  const m2 = await sharp('public/images/real/interior_studio_floor.webp').metadata();
  const m3 = await sharp('public/images/real/interior_styling_stations.webp').metadata();
  console.log('backup interior_studio_floor:', m1.width, 'x', m1.height);
  console.log('current interior_studio_floor:', m2.width, 'x', m2.height);
  console.log('current interior_styling_stations:', m3.width, 'x', m3.height);
}

check().catch(console.error);
