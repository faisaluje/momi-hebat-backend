import request from 'supertest';
import { app } from '../../../app';

const createNewUser = async (cookie: string[], prefix: number = 1) => {
  const result = await request(app)
    .post('/api/users')
    .set('Cookie', cookie)
    .send({
      username: `admin_${prefix}`,
      password: 'admin',
      nama: `Admin ${prefix}`,
      noHp: '081297282354',
    });

  return result.body;
};

it('returns a 401 if not authenticated', () => {
  return request(app)
    .patch('/api/users/12312324')
    .send({
      username: 'faisaluje',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(401);
});

it('returns a 400 if change the password', async () => {
  const cookie = await global.signin();

  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send({
      username: 'admin_1',
      password: 'ainkpisan',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 if given username changed and exist', async () => {
  const cookie = await global.signin();

  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send({
      username: 'admin',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 if given invalid username', async () => {
  const cookie = await global.signin();

  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send({
      username: 'ad',
      nama: 'Faisal Uje',
      noHp: '081297282354',
    })
    .expect(400);
});

it('returns a 400 if given invalid status', async () => {
  const cookie = await global.signin();

  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send({
      username: 'admin_1',
      nama: 'Faisal Uje',
      noHp: '081297282354',
      status: 'AKTIF',
    })
    .expect(400);
});

it('returns a 200 if given a valid data', async () => {
  const cookie = await global.signin();

  const user = await createNewUser(cookie);

  const update = await request(app)
    .patch(`/api/users/${user.id}`)
    .set('Cookie', cookie)
    .send({
      username: 'admin_1',
      nama: 'Faisal Uje',
      noHp: '081297282354',
      status: 'tidak_aktif',
    });

  expect(update.status).toEqual(200);
});
