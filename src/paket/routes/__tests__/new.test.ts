import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';
import { Barang } from '../../../barang/models/barang';

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

// it("return a 400 if some barang's name is empty", async () => {
//   const cookie = await global.signin();

//   await Barang.createCollection();

//   const post = await request(app)
//     .post('/api/paket')
//     .set('Cookie', cookie)
//     .send({
//       nama: 'Hebat Kids 2000',
//       harga: 650000,
//       cashback: 400000,
//       biayaPacking: 5000,
//       barangs: [
//         {
//           nama: 'astor',
//           keterangan: 'tak tersimpan',
//         },
//         {
//           nama: 'permen',
//           keterangan: 'Barang tak bernama',
//         },
//       ],
//     })
//     .expect(400);

//   const listBarang = await Barang.find({});
//   console.log(listBarang);

//   expect(listBarang.length).toEqual(0);
// });
