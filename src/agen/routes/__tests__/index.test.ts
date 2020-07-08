import request from 'supertest'

import { app } from '../../../app'
import { Agen, AgenAttrs, AgenDoc } from '../../models/agen'

const agen: AgenAttrs = {
  diri: {
    nama: { lengkap: 'Faisal', panggilan: 'uje' },
    alamat: {
      jalan: 'Blok C8 No. 3',
      rt: null,
      rw: null,
      kelurahan: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Bandung',
      tanggal: new Date('1993-07-22'),
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
      kelurahan: null,
      kecamatan: null,
      kabKota: null,
    },
    lahir: {
      tempat: 'Surga',
      tanggal: new Date('1980-01-20'),
    },
    pekerjaan: 'Pensiun',
    noTlp: null,
  },
};

const createNewAgen = (no: string, cookie: string[], topAgen?: AgenDoc) => {
  return request(app)
    .post('/api/agen')
    .set('Cookie', cookie)
    .send({
      ...agen,
      no,
      topAgen,
    });
};

it('responds 401 if not authenticated', async () => {
  const result = await request(app)
    .post('/api/agen')
    .send({
      ...agen,
      no: '1',
    });

  expect(result.status).toEqual(401);
});

it('responds with list of agens', async () => {
  const cookie = await global.signin();

  for (let no = 1; no <= 10; no++) {
    await createNewAgen(`${no}`, cookie);
  }

  const response = await request(app)
    .get('/api/agen')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.length).toEqual(10);

  for (let no = 1; no <= response.body.length; no++) {
    const newAgen = response.body[no - 1];
    expect(newAgen.diri.nama.lengkap).toBeDefined();
    expect(newAgen.no).toEqual(`${no}`);
  }
});

it('responds with only one agen detail', async () => {
  const cookie = await global.signin();

  const newAgen = await createNewAgen(`121`, cookie);

  const response = await request(app)
    .get('/api/agen/' + newAgen.body.id)
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.no).toEqual('121');
});

it('responds agen with sub agen', async () => {
  const cookie = await global.signin();
  const topAgen = await createNewAgen('212', cookie);
  await createNewAgen('', cookie, topAgen.body);
  await createNewAgen('', cookie, topAgen.body);

  const agens = await Agen.findById(topAgen.body.id).populate('subAgens');
  expect(agens?.subAgens.length).toEqual(2);
});
