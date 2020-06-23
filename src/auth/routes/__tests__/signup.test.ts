import request from 'supertest';
import { app } from '../../../app';
import { UserPeran } from '../../enums/user-peran';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(201);
});

it('returns a 400 with an invalid username', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      username: 'fa',
      password: 'ainkpisan',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      username: 'a@a.com',
      password: 'a',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 with missing username and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'a@a.com',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'faisaluje',
    })
    .expect(400);
});

it('returns a 400 with filling peran', async () => {
  const result = await request(app).post('/api/users/signup').send({
    username: 'faisaluje',
    password: 'ainkpisan',
    nama: 'Faisal Uje',
    noHp: '081297282354',
  });

  expect(result.status).toEqual(201);
});

it('dissalows duplicate usernames', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'a@a.com',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      username: 'a@a.com',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      username: 'a@a.com',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
