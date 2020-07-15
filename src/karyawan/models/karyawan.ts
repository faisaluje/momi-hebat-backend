import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { KaryawanStatus } from '../enums/karyawan-status'

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
  status: KaryawanStatus;
}

interface KaryawanModel extends mongooseDelete.SoftDeleteModel<KaryawanDoc> {
  build(attrs: KaryawanAttrs): KaryawanDoc;
}

const karyawanSchema = new mongoose.Schema(
  {
    no: Number,
    nama: {
      type: String,
      required: true,
    },
    alamat: String,
    noHp: String,
    status: {
      type: String,
      required: true,
      enum: Object.values(KaryawanStatus),
      default: KaryawanStatus.AKTIF,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deleted;
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
  const karyawanCount = await Karyawan.estimatedDocumentCount();
  if (!this.get('no')) {
    this.set('no', karyawanCount + 1);
  }

  next();
});

karyawanSchema.statics.build = (attrs: KaryawanAttrs) => {
  return new Karyawan(attrs);
};

const Karyawan = mongoose.model<KaryawanDoc, KaryawanModel>(
  'Karyawan',
  karyawanSchema
);

export { Karyawan, KaryawanDoc, KaryawanAttrs };
