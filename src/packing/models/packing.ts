import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { JenisPaketDoc } from '../../jenis-paket/models/jenis-paket'
import { KaryawanDoc } from '../../karyawan/models/karyawan'
import { PeriodeDoc } from '../../periode/models/periode'
import { PeriodeAktif } from '../../periode/services/periode-aktif'

interface ProsesDoc {
  karyawan: string;
  jenisPaket: string;
  jumlah: number;
}

interface PackingAttrs {
  tgl: Date;
  proses: ProsesDoc[];
}

interface PackingDoc extends mongooseDelete.SoftDeleteDocument {
  tgl: Date;
  proses: {
    karyawan: KaryawanDoc;
    jenisPaket: JenisPaketDoc;
    jumlah: number;
  }[];
  periode: PeriodeDoc;
}

interface PackingModel extends mongooseDelete.SoftDeleteModel<PackingDoc> {
  build(attrs: PackingAttrs): PackingDoc;
}

const packingSchema = new mongoose.Schema(
  {
    tgl: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    proses: [
      {
        karyawan: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Karyawan',
          required: true,
        },
        jenisPaket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'JenisPaket',
          required: true,
        },
        jumlah: {
          type: Number,
          required: true,
        },
      },
    ],
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
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

packingSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

packingSchema.pre('save', async function (next) {
  if (this.isNew) {
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    this.set('periode', periodeAktif);
  }

  next();
});

packingSchema.statics.build = (attrs: PackingAttrs) => new Packing(attrs);

const Packing = mongoose.model<PackingDoc, PackingModel>(
  'Packing',
  packingSchema
);

export { Packing, PackingDoc, PackingAttrs };
