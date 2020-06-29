import request from 'supertest';
import { app } from '../../../app';

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/karyawan')
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(401);
});

it('returns a 400 if name field is empty', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 if noHp field is invalid', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: 'asoykeun',
    })
    .expect(400);
});

it('returns a 201 if given valid values', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(201);
});

it('returns a no = 1 if first add karyawan', async () => {
  const cookie = await global.signin();

  const karyawan = await request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(201);

  expect(karyawan.body.no).toEqual(1);
});

it('returns a no = 2 if second add karyawan', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(201);

  const karyawan = await request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: 'Faisal Uje',
      alamat: 'Jl. Puri Asih III',
      noHp: '081297282354',
    })
    .expect(201);

  expect(karyawan.body.no).toEqual(2);
});
