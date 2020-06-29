import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

interface KaryawanAttrs {
  nama: string;
  alamat: string;
  noHp: string;
}

interface KaryawanDoc extends mongooseDelete.SoftDeleteDocument {
  no: number;
  nama: string;
  alamat: string;
  noHp: string;
}

interface KaryawanModel extends mongooseDelete.SoftDeleteModel<KaryawanDoc> {
  build(attrs: KaryawanAttrs): KaryawanDoc;
}

const karyawanSchema = new mongoose.Schema(
  {
    no: {
      type: Number,
    },
    nama: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
    },
    noHp: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

karyawanSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

karyawanSchema.pre('save', async function (next) {
  const karyawanCount = await Karyawan.countDocuments();
  this.set('no', karyawanCount + 1);

  next();
});

karyawanSchema.statics.build = (attrs: KaryawanAttrs) => {
  return new Karyawan(attrs);
};

const Karyawan = mongoose.model<KaryawanDoc, KaryawanModel>(
  'Karyawan',
  karyawanSchema
);

export { Karyawan, KaryawanDoc };
