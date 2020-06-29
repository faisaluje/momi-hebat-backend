import mongoose from 'mongoose';
import { PeriodeStatus } from '../enums/periode-status';
import mongooseDelete from 'mongoose-delete';

interface PeriodeAttrs {
  nama: string;
  tglMulai: Date;
  tglBerakhir: Date;
  status: PeriodeStatus;
}

interface PeriodeDoc extends mongoose.Document {
  nama: string;
  tglMulai: Date;
  tglBerakhir: Date;
  status: PeriodeStatus;
}

interface PeriodeModel extends mongoose.Model<PeriodeDoc> {
  build(attrs: PeriodeAttrs): PeriodeDoc;
}

const periodeSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tglMulai: {
      type: Date,
      required: true,
    },
    tglBerakhir: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PeriodeStatus),
      default: PeriodeStatus.TIDAK_AKTIF,
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

periodeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

periodeSchema.statics.build = (attrs: PeriodeAttrs) => {
  return new Periode(attrs);
};

const Periode = mongoose.model<PeriodeDoc, PeriodeModel>(
  'Periode',
  periodeSchema
);

export { Periode };
