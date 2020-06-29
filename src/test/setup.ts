import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { Periode } from '../periode/models/periode';
import { PeriodeStatus } from '../periode/enums/periode-status';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const periode = new Periode({
    nama: `2019-2020`,
    tglMulai: '2019-01-01',
    tglBerakhir: '2020-01-01',
    status: PeriodeStatus.AKTIF,
  });
  await periode.save();

  const response = await request(app).post('/api/users/signup').send({
    username: 'admin',
    password: 'ainkpisan',
    nama: 'Faisal Uje',
    noHp: '081297282354',
  });

  return response.get('Set-Cookie');
};
