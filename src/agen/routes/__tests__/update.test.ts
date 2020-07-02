import request from 'supertest';
import { app } from '../../../app';
import { AgenAttrs } from '../../models/agen';
import mongoose from 'mongoose';

const agen: AgenAttrs = {
  diri: {
    nama: { lengkap: 'Faisal', panggilan: 'uje' },
    alamat: {
      jalan: 'Blok C8 No. 3',
      rt: null,
      rw: null,
      keluraham: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Bandung',
      tgl: new Date('1993-07-22'),
    },
    pekerjaan: 'Swasta',
    noTlp: null,
  },
  keluarga: {
    nama: { lengkap: 'Babe', panggilan: 'Asoy' },
    alamat: {
      jalan: 'Blok C8 No. 3',
      rt: null,
      rw: null,
      keluraham: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Surga',
      tgl: new Date('1980-01-20'),
    },
    pekerjaan: 'Pensiun',
    noTlp: null,
  },
};

const createNewAgen = (no: string, cookie: string[]) => {
  return request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no,
    });
};

it('returns a 401 if not authenticated', () => {
  const id = mongoose.Types.ObjectId();

  return request(app)
    .patch(`/api/agen/${id}`)
    .send({
      no: '123',
    })
    .expect(401);
});

it('return a 404 if agen is not found', async () => {
  const id = mongoose.Types.ObjectId();
  const cookie = await global.signin();

  return request(app)
    .patch(`/api/agen/${id}`)
    .set('Cookie', cookie)
    .send({
      no: '123',
    })
    .expect(404);
});

it('return a 200 if agen is updated', async () => {
  const cookie = await global.signin();
  const newAgen = await createNewAgen('1', cookie);

  return request(app)
    .patch(`/api/agen/${newAgen.body.id}`)
    .set('Cookie', cookie)
    .send({
      no: '123',
    })
    .expect(200);
});

it('level is changed if topAgen is not empty', async () => {
  const cookie = await global.signin();
  const newAgen = await createNewAgen('1', cookie);

  const subAgen = await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      topAgen: newAgen.body,
    })
    .expect(201);

  expect(subAgen.body.level).toEqual(2);

  const updated = await request(app)
    .patch(`/api/agen/${newAgen.body.id}`)
    .set('Cookie', cookie)
    .send({
      topAgen: null,
    })
    .expect(200);

  expect(updated.body.level).toEqual(1);
});
