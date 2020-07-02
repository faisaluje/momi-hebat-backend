import request from 'supertest';
import { app } from '../../../app';
import { AgenAttrs, Agen } from '../../models/agen';

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

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/agen')
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(401);
});

it('returns a 400 if no & topAgen fields is empty', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send(agen)
    .expect(400);
});

it('agen created if given valid the body', async () => {
  const cookie = await global.signin();

  const result = await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no: 1,
    })
    .expect(201);

  expect(result.body.level).toEqual(1);
});

it('no agen is generated if topAgen is not empty', async () => {
  const cookie = await global.signin();

  const newAgen = Agen.build({
    ...agen,
    no: '1',
  });
  await newAgen.save();

  const result = await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      topAgen: newAgen,
    })
    .expect(201);

  expect(result.body.level).toEqual(2);
  expect(result.body.topAgen).toBeDefined();
  expect(result.body.no).toBeDefined();
});

it('returns a 400 if no agen is existed', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no: 1,
    })
    .expect(201);

  await request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no: 1,
    })
    .expect(400);
});
