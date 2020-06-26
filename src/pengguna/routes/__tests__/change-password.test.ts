import request from 'supertest';
import { app } from '../../../app';
import mongo from 'mongodb';

const createNewUser = async (cookie: string[], prefix: number = 1) => {
  const result = await request(app)
    .post('/api/pengguna')
    .set('Cookie', cookie)
    .send({
      username: `admin_${prefix}`,
      password: 'admin',
      retypePassword: 'admin',
      nama: `Admin ${prefix}`,
      noHp: '081297282354',
    })
    .expect(201);

  return result.body;
};

it('returns a 401 if not authorized', async () => {
  const cookie = await global.signin();
  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/pengguna/changePassword/${user.id}`)
    .send({
      currentPassword: 'admin',
      newPassword: 'admin1',
      retypeNewPassword: 'admin1',
    })
    .expect(401);
});

it('returns a 404 if pengguna not found', async () => {
  const cookie = await global.signin();

  return request(app)
    .patch(`/api/pengguna/changePassword/${new mongo.ObjectId()}`)
    .set('Cookie', cookie)
    .send({
      currentPassword: 'admin',
      newPassword: 'admin1',
      retypeNewPassword: 'admin1',
    })
    .expect(404);
});

it('returns a 400 if supply wrong current password', async () => {
  const cookie = await global.signin();
  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/pengguna/changePassword/${user.id}`)
    .set('Cookie', cookie)
    .send({
      currentPassword: 'admin1',
      newPassword: 'admin1',
      retypeNewPassword: 'admin1',
    })
    .expect(400);
});

it('returns a 400 if invalid new password', async () => {
  const cookie = await global.signin();
  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/pengguna/changePassword/${user.id}`)
    .set('Cookie', cookie)
    .send({
      currentPassword: 'admin',
      newPassword: 'ad',
      retypeNewPassword: 'ad',
    })
    .expect(400);
});

it('returns a 400 if retype new password not matched', async () => {
  const cookie = await global.signin();
  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/pengguna/changePassword/${user.id}`)
    .set('Cookie', cookie)
    .send({
      currentPassword: 'admin',
      newPassword: 'admin1',
      retypeNewPassword: 'ad',
    })
    .expect(400);
});

it('returns a 200 when given valid inputs', async () => {
  const cookie = await global.signin();
  const user = await createNewUser(cookie);

  return request(app)
    .patch(`/api/pengguna/changePassword/${user.id}`)
    .set('Cookie', cookie)
    .send({
      currentPassword: 'admin',
      newPassword: 'admin1',
      retypeNewPassword: 'admin1',
    })
    .expect(200);
});
