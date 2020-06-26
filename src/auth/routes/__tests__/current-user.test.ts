import request from 'supertest';
import { app } from '../../../app';
import { PenggunaPeran } from '../../../pengguna/enums/pengguna-peran';

it('responds with details about the current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.username).toEqual('admin');
  expect(response.body.currentUser.peran).toEqual(PenggunaPeran.OPERATOR);
  expect(response.body.currentUser.password).toBeUndefined();
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
