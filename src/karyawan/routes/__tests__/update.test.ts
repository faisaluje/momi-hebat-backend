import request from 'supertest';
import { app } from '../../../app';
import mongoose from 'mongoose';

const createNewKaryawan = async (cookie: string[]) => {
  const karyawan = await request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: `Faisal Uje`,
    });

  return karyawan.body;
};

it('returns a 401 if not authenticated', () => {
  const id = mongoose.Types.ObjectId();

  return request(app)
    .patch(`/api/karyawan/${id}`)
    .send({
      nama: 'Faisal',
    })
    .expect(401);
});

it('returns a 400 if field nama is empty', async () => {
  const cookie = await global.signin();

  const karyawan = await createNewKaryawan(cookie);

  await request(app)
    .patch(`/api/karyawan/${karyawan.id}`)
    .set('Cookie', cookie)
    .send()
    .expect(400);
});

it('returns a 400 if field noHp is not numeric', async () => {
  const cookie = await global.signin();

  const karyawan = await createNewKaryawan(cookie);

  await request(app)
    .patch(`/api/karyawan/${karyawan.id}`)
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal',
      noHp: 'asoy',
    })
    .expect(400);
});

it('returns a 400 if field no is not empty', async () => {
  const cookie = await global.signin();

  const karyawan = await createNewKaryawan(cookie);

  await request(app)
    .patch(`/api/karyawan/${karyawan.id}`)
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal',
      no: 23,
    })
    .expect(400);
});

it('returns a 201 if given valid body', async () => {
  const cookie = await global.signin();

  const karyawan = await createNewKaryawan(cookie);

  const update = await request(app)
    .patch(`/api/karyawan/${karyawan.id}`)
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal',
      alamat: 'Bandung',
      noHp: '081297282354',
    })
    .expect(200);

  expect(update.body.no).toEqual(karyawan.no);
});
