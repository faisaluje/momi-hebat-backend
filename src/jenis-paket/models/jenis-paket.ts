import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { BarangDoc, barangSchema } from '../../barang/models/barang'
import { PeriodeDoc } from '../../periode/models/periode'
import { JenisPaketStatus } from '../enums/jenis-paket-status'

interface JenisPaketAttrs {
  nama: string;
  biayaPacking: number;
  barangs: BarangDoc[];
  keterangan?: string;
  status: JenisPaketStatus;
  periode: PeriodeDoc;
}

interface JenisPaketDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  biayaPacking: number;
  barangs: BarangDoc[];
  keterangan: string;
  status: JenisPaketStatus;
  periode: PeriodeDoc;
}

interface JenisPaketModel
  extends mongooseDelete.SoftDeleteModel<JenisPaketDoc> {
  build(attrs: JenisPaketAttrs): JenisPaketDoc;
}

const jenisPaketSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    biayaPacking: {
      type: Number,
      required: true,
      default: 0,
    },
    barangs: [barangSchema],
    keterangan: String,
    status: {
      type: String,
      required: true,
      enum: Object.values(JenisPaketStatus),
      default: JenisPaketStatus.AKTIF,
    },
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

jenisPaketSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

jenisPaketSchema.statics.build = (attrs: JenisPaketAttrs) =>
  new JenisPaket(attrs);

const JenisPaket = mongoose.model<JenisPaketDoc, JenisPaketModel>(
  'JenisPaket',
  jenisPaketSchema
);

export { jenisPaketSchema, JenisPaket, JenisPaketAttrs, JenisPaketDoc };
