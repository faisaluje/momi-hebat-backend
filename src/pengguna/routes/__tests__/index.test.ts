import request from 'supertest';
import { app } from '../../../app';

const createNewUser = (prefix: number, cookie: string[]) => {
  return request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: `admin_${prefix}`,
      password: 'admin',
      nama: `Admin ${prefix}`,
      noHp: '081297282354',
    });
};

it('responds with list of users', async () => {
  const cookie = await global.signin();

  for (let prefix = 1; prefix <= 10; prefix++) {
    await createNewUser(prefix, cookie);
  }

  const response = await request(app)
    .get('/api/pengguna')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  for (const pengguna of response.body) {
    expect(pengguna.password).toBeUndefined();
    expect(pengguna.id).toBeDefined();
  }

  expect(response.body.length).toEqual(11);
});

it('responds 401 if not authenticated', async () => {
  const result = await request(app).post('/api/pengguna').send({
    username: `admin`,
    password: 'admin',
    nama: `Admin`,
    noHp: '081297282354',
  });

  expect(result.status).toEqual(401);
});
