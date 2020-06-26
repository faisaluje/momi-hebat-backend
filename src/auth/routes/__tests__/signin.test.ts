import request from 'supertest';
import { app } from '../../../app';
import { PenggunaPeran } from '../../../pengguna/enums/pengguna-peran';

it('fails when an username that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      username: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
  await global.signin();

  await request(app)
    .post('/api/users/signin')
    .send({
      username: 'admin',
      password: 'aseloe',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await global.signin();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      username: 'admin',
      password: 'ainkpisan',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('responds with a jwt payload  when login success', async () => {
  await global.signin();

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      username: 'admin',
      password: 'ainkpisan',
    })
    .expect(200);

  expect(response.body.username).toEqual('admin');
  expect(response.body.peran).toEqual(PenggunaPeran.OPERATOR);
  expect(response.body.password).toBeUndefined();
});
