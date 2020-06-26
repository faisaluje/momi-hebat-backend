import mongoose from 'mongoose';
import { Password } from '../../auth/services/password';
import { PenggunaStatus } from '../enums/pengguna-status';
import { PenggunaPeran } from '../enums/pengguna-peran';

// An interface that describes the properties
// that are required to create a new User
interface PenggunaAttrs {
  username: string;
  password: string;
  nama: string;
  noHp: string;
  peran: PenggunaPeran;
}

// An interface that describes the properties
// that a User Document has
interface PenggunaDoc extends mongoose.Document {
  username: string;
  password: string;
  nama: string;
  noHp: string;
  peran: PenggunaPeran;
  status: PenggunaStatus;
}

// An interface that descibes the properties
// that a User Model has
interface PenggunaModel extends mongoose.Model<PenggunaDoc> {
  build(attrs: PenggunaAttrs): PenggunaDoc;
}

const penggunaSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    nama: {
      type: String,
      required: true,
    },
    noHp: {
      type: String,
      required: true,
    },
    peran: {
      type: String,
      required: true,
      enum: Object.values(PenggunaPeran),
      default: PenggunaPeran.OPERATOR,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PenggunaStatus),
      default: PenggunaStatus.AKTIF,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      versionKey: false,
    },
  }
);

penggunaSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

penggunaSchema.statics.build = (attrs: PenggunaAttrs) => {
  return new Pengguna(attrs);
};

const Pengguna = mongoose.model<PenggunaDoc, PenggunaModel>(
  'User',
  penggunaSchema
);

export { Pengguna };
