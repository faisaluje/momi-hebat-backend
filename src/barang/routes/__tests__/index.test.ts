import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';

const createNewBarang = async (prefix: number, cookie: string[]) => {
  const result = await request(app)
    .post('/api/barang')
    .set('Cookie', cookie)
    .send({
      nama: `Bengbeng ${prefix}`,
      keterangan: `Keterangan barang`,
    });

  return result.body;
};

it('responds 401 if not authenticated', async () => {
  const result = await request(app).post('/api/barang').send({
    nama: `2019_01`,
  });

  expect(result.status).toEqual(401);
});

it('responds with list of barangs', async () => {
  const cookie = await global.signin();

  for (let prefix = 1; prefix <= 10; prefix++) {
    await createNewBarang(prefix, cookie);
  }

  const response = await request(app)
    .get('/api/barang')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  for (let no = 1; no <= response.body.length; no++) {
    const barang = response.body[no - 1];
    expect(barang.nama).toBeDefined();
    expect(barang.keterangan).toBeDefined();
  }

  expect(response.body.length).toEqual(10);
});
