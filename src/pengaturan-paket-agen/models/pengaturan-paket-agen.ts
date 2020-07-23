import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { AgenDoc } from '../../agen/models/agen'
import { PaketDoc } from '../../paket/models/paket'
import { PeriodeDoc } from '../../periode/models/periode'
import { JenisPengaturanPaketAgen } from '../enums/jenis-pengaturan-paket-agen'

interface PengaturanPaketAgenAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisPengaturanPaketAgen;
  agen: string;
  items: {
    paket: string;
    jumlah: number;
  }[];
  catatan?: string;
  periode: string;
}

interface PengaturanPaketAgenDoc extends mongooseDelete.SoftDeleteDocument {
  no: string;
  tgl: Date;
  jenis: JenisPengaturanPaketAgen;
  agen: AgenDoc;
  items: {
    paket: PaketDoc;
    jumlah: number;
  }[];
  catatan: string;
  periode: PeriodeDoc;
}

interface PengaturanPaketAgenModel
  extends mongooseDelete.SoftDeleteModel<PengaturanPaketAgenDoc> {
  build(attrs: PengaturanPaketAgenAttrs): PengaturanPaketAgenDoc;
}

const pengaturanPaketAgenSchema = new mongoose.Schema(
  {
    no: String,
    tgl: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
      enum: Object.values(JenisPengaturanPaketAgen),
      default: JenisPengaturanPaketAgen.BOOKING,
    },
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
      required: true,
    },
    catatan: String,
    items: [
      {
        paket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Paket',
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
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deleted;
      },
    },
  }
);

pengaturanPaketAgenSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

pengaturanPaketAgenSchema.statics.build = (attrs: PengaturanPaketAgenAttrs) =>
  new PengaturanPaketAgen(attrs);

const PengaturanPaketAgen = mongoose.model<
  PengaturanPaketAgenDoc,
  PengaturanPaketAgenModel
>('PengaturanPaketAgen', pengaturanPaketAgenSchema);

export {
  PengaturanPaketAgen,
  PengaturanPaketAgenAttrs,
  PengaturanPaketAgenDoc,
};
