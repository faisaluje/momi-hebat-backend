import request from 'supertest'

import { app } from '../../../app'
import { Barang } from '../../models/barang'
import { BarangService } from '../barang'

it('create new barang if not exists', async () => {
  const cookie = await global.signin();

  const result = await request(app)
    .post('/api/barang')
    .set('Cookie', cookie)
    .send({
      nama: 'Bengbeng',
    })
    .expect(201);

  const listBarang: any[] = [
    ...result.body,
    { nama: 'Ciki' },
    { nama: 'Snack' },
    { nama: 'Mie' },
    { nama: 'Minum' },
  ];

  const newListBarang = await BarangService.getListBarang(listBarang);
  expect(newListBarang.length).toEqual(5);

  const barangInDb = await Barang.find();
  expect(barangInDb.length).toEqual(5);
});
