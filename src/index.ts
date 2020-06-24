import mongoose from 'mongoose';
import { app } from './app';
import { JWT_KEY, MONGO_URI } from './contants';

const start = async () => {
  if (!process.env.JWT_KEY && !JWT_KEY) {
    throw new Error('JWT_KEY undefined');
  }

  if (!MONGO_URI) {
    throw new Error('MONGO_URI undefined');
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3001, () => {
    console.log('Listening on port 3001');
  });
};

start();
