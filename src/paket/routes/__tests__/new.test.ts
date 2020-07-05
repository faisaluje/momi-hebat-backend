import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Barang } from '../../../barang/models/barang';
import { Paket } from '../../models/paket';

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/paket')
    .send({
      nama: 'Hebat Kids 2000',
      harga: 650000,
      cashback: 400000,
      biayaPacking: 5000,
      barangs: [],
    })
    .expect(401);
});

it('return a 400 if name field is empty', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/paket')
    .set('Cookie', cookie)
    .send({
      harga: 650000,
      cashback: 400000,
      biayaPacking: 5000,
      barangs: [],
    })
    .expect(400);
});

it('return a 400 if periode is not found', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/paket')
    .set('Cookie', cookie)
    .send({
      nama: 'Hebat Kids 2000',
      harga: 650000,
      cashback: 400000,
      biayaPacking: 5000,
      barangs: [],
      periode: { id: mongoose.Types.ObjectId() },
    })
    .expect(400);
});

it("returns a 400 if some barang's name is empty", async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/paket')
    .set('Cookie', cookie)
    .send({
      nama: 'Hebat Kids 2000',
      harga: 650000,
      cashback: 400000,
      biayaPacking: 5000,
      barangs: [
        {
          nama: 'astor',
          keterangan: 'tak tersimpan',
        },
        {
          keterangan: 'Barang tak bernama',
        },
      ],
    })
    .expect(400);

  const listBarang = await Barang.find({});
  expect(listBarang.length).toEqual(0);
});

it('returns a 201 when given valid body', async () => {
  const cookie = await global.signin();
  const result = await request(app)
    .post('/api/paket')
    .set('Cookie', cookie)
    .send({
      nama: 'Hebat Kids 2000',
      harga: 650000,
      cashback: 400000,
      biayaPacking: 5000,
      barangs: [
        {
          nama: 'astor',
        },
        {
          nama: 'Yupi',
        },
      ],
    })
    .expect(201);

  const listBarang = await Barang.find({});
  expect(listBarang.length).toEqual(2);

  const paket = await Paket.findById(result.body.id);
  expect(paket).toBeDefined();
  expect(paket?.barangs.length).toEqual(2);
});
