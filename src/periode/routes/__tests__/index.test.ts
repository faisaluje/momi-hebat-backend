import request from 'supertest';
import { app } from '../../../app';
import { PeriodeStatus } from '../../enums/periode-status';

const createNewPeriode = (prefix: number, cookie: string[]) => {
  return request(app)
    .post('/api/periode')
    .set('Cookie', cookie)
    .send({
      nama: `2019_${prefix}`,
      tglMulai: '2019-01-01',
      tglBerakhir: '2020-01-01',
      status: PeriodeStatus.AKTIF,
    });
};

it('responds with list of users', async () => {
  const cookie = await global.signin();

  for (let prefix = 1; prefix <= 10; prefix++) {
    await createNewPeriode(prefix, cookie);
  }

  const response = await request(app)
    .get('/api/periode')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  for (const periode of response.body) {
    expect(periode.tglMulai).toBeDefined();
    expect(periode.id).toBeDefined();
  }

  expect(response.body.length).toEqual(11);
});

it('responds 401 if not authenticated', async () => {
  const result = await request(app).post('/api/periode').send({
    nama: `2019_01`,
    tglMulai: '2019-01-01',
    tglBerakhir: '2020-01-01',
    status: PeriodeStatus.AKTIF,
  });

  expect(result.status).toEqual(401);
});
