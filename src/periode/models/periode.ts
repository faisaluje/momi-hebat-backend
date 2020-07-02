import mongoose from 'mongoose';
import { PeriodeStatus } from '../enums/periode-status';
import mongooseDelete from 'mongoose-delete';
import { PeriodeAktif } from '../services/periode-aktif';

interface ReferensiDoc {
  judul: string;
  alamat: string;
  noHp: string;
}

interface PeriodeAttrs {
  nama: string;
  tglMulai: Date;
  tglBerakhir: Date;
  status: PeriodeStatus;
  referensi: ReferensiDoc;
}

interface PeriodeDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  tglMulai: Date;
  tglBerakhir: Date;
  status: PeriodeStatus;
  referensi: ReferensiDoc;
}

interface PeriodeModel extends mongooseDelete.SoftDeleteModel<PeriodeDoc> {
  build(attrs: PeriodeAttrs): PeriodeDoc;
}

const periodeSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tglMulai: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    tglBerakhir: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PeriodeStatus),
      default: PeriodeStatus.TIDAK_AKTIF,
    },
    referensi: {
      judul: {
        type: String,
        required: true,
        default: 'Paket Momi Hebat',
      },
      alamat: {
        type: String,
      },
      noHp: {
        type: String,
      },
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

periodeSchema.pre('save', async function (next) {
  if (this.get('status') === PeriodeStatus.AKTIF) {
    await PeriodeAktif.setPeriodeAktif(this.get('_id'));
  }
  next();
});

periodeSchema.statics.build = (attrs: PeriodeAttrs) => {
  return new Periode(attrs);
};

const Periode = mongoose.model<PeriodeDoc, PeriodeModel>(
  'Periode',
  periodeSchema
);

export { Periode, PeriodeDoc };
