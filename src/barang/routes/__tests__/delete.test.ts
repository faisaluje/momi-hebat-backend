import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Barang } from '../../model/barang';

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

  return request(app).delete(`/api/barang/${id}`).send().expect(401);
});

it('return a 404 if barang not found', async () => {
  const cookie = await global.signin();
  const id = mongoose.Types.ObjectId();

  return request(app)
    .delete(`/api/barang/${id}`)
    .set('Cookie', cookie)
    .send()
    .expect(404);
});

it('successfully soft deleted', async () => {
  const cookie = await global.signin();
  const newBarang = await createNewBarang(cookie);

  await request(app)
    .delete(`/api/barang/${newBarang.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(204);

  const notExisted = await Barang.findOneDeleted({
    _id: newBarang.id,
  });

  expect(notExisted).not.toBeNull();
});
