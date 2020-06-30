import request from 'supertest';
import { app } from '../../../app';

const createNewKaryawan = (prefix: number, cookie: string[]) => {
  return request(app)
    .post('/api/karyawan')
    .set('Cookie', cookie)
    .send({
      nama: `Faisal Uje ${prefix}`,
    });
};

it('responds 401 if not authenticated', async () => {
  const result = await request(app).post('/api/karyawan').send({
    nama: `2019_01`,
  });

  expect(result.status).toEqual(401);
});

it('responds with list of karyawans', async () => {
  const cookie = await global.signin();

  for (let prefix = 1; prefix <= 10; prefix++) {
    await createNewKaryawan(prefix, cookie);
  }

  const response = await request(app)
    .get('/api/karyawan')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  for (let no = 1; no <= response.body.length; no++) {
    const karyawan = response.body[no - 1];
    expect(karyawan.nama).toBeDefined();
    expect(karyawan.alamat).toBeUndefined();
    expect(karyawan.no).toEqual(no);
  }

  expect(response.body.length).toEqual(10);
});
