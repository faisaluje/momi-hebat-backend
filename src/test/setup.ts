import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import { UserPeran } from '../auth/enums/user-peran';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = 'key1';

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
  const username = 'uje';
  const password = 'password';
  const nama = 'Faisal Uje';
  const noHp = '081297282354';
  const peran = UserPeran.ADMIN;

  const response = await request(app)
    .post('/api/users/signup')
    .send({ username, password, nama, noHp, peran })
    .expect(201);

  return response.get('Set-Cookie');
};
