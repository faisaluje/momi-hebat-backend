import request from 'supertest';
import { app } from '../../../app';
import { PenggunaPeran } from '../../enums/pengguna-peran';

it('returns a 401 if not authenticated', () => {
  return request(app)
    .post('/api/pengguna')
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(401);
});

it('returns a 201 & new user on successful create new user', async () => {
  const cookie = await global.signin();

  const result = await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    });

  expect(result.status).toEqual(201);
  expect(result.body.username).toEqual('faisaluje');
  expect(result.body.id).toBeDefined();
});

it('returns a 400 with an invalid username', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'fa',
      password: 'ainkpisan',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  const cookie = await global.signin();

  return request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'a@a.com',
      password: 'a',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 with missing username and password', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'a@a.com',
    })
    .expect(400);

  await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      password: 'faisaluje',
    })
    .expect(400);
});

it('returns a 400 with filling peran', async () => {
  const cookie = await global.signin();

  const result = await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
      peran: PenggunaPeran.ADMIN,
    });

  expect(result.status).toEqual(400);
});

it('dissalows duplicate usernames', async () => {
  const cookie = await global.signin();

  await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'a@a.com',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(201);

  await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: 'a@a.com',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});
