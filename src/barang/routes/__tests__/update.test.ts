import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';

const createNewBarang = async (cookie: string[]) => {
  const barang = await request(app)
    .post('/api/barang')
    .set('Cookie', cookie)
    .send({
      nama: 'Barang',
    });

  return barang.body;
};

it('returns a 401 if not authenticated', () => {
  const id = mongoose.Types.ObjectId();

  return request(app)
    .patch(`/api/barang/${id}`)
    .send({
      nama: 'Barang 22',
    })
    .expect(401);
});

it('returns a 400 if field nama is empty', async () => {
  const cookie = await global.signin();
  const barang = await createNewBarang(cookie);

  await request(app)
    .patch(`/api/barang/${barang.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

it('returns a 200 if given valid body', async () => {
  const cookie = await global.signin();
  const barang = await createNewBarang(cookie);

  const update = await request(app)
    .patch(`/api/barang/${barang.id}`)
    .set('Cookie', cookie)
    .send({
      nama: 'Barang baru',
      keterangan: 'Baru sampai',
    })
    .expect(200);

  expect(update.body.keterangan).toEqual('Baru sampai');
});
