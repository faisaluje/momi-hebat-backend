import mongoose from 'mongoose';
import { Password } from '../services/password';
import { UserStatus } from '../enums/user-status';
import { UserPeran } from '../enums/user-peran';

// An interface that describes the properties
// that are required to create a new User
interface UserAttrs {
  username: string;
  password: string;
  nama: string;
  noHp: string;
  peran: UserPeran;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  username: string;
  password: string;
  nama: string;
  noHp: string;
  peran: UserPeran;
  status: UserStatus;
}

// An interface that descibes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
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
      enum: Object.values(UserPeran),
      default: UserPeran.OPERATOR,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(UserStatus),
      default: UserStatus.AKTIF,
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

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
