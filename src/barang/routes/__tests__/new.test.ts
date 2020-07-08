import request from 'supertest'

import { app } from '../../../app'

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/barang')
    .send({
      nama: 'Bengbeng',
    })
    .expect(401);
});

it('returns a 400 if name field is empty', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/barang')
    .set('Cookie', cookie)
    .send({
      keterangan: 'Barang tidak ada nama',
    })
    .expect(400);
});

it('returns a 201 if given valid values', async () => {
  const cookie = await global.signin();

  const result = await request(app)
    .post('/api/barang')
    .set('Cookie', cookie)
    .send({
      nama: 'Bengbeng',
    })
    .expect(201);

  expect(result.body.id).toBeDefined();
  expect(result.body.nama).toEqual('Bengbeng');
  expect(result.body.keterangan).toBeUndefined();
});
