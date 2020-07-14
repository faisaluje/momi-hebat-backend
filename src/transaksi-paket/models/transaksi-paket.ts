import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { AgenDoc } from '../../agen/models/agen'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { JenisPaketDoc } from '../../jenis-paket/models/jenis-paket'
import { PeriodeDoc } from '../../periode/models/periode'
import { TransaksiKategori } from '../enums/transaksi-kategori'

interface PaketsDoc {
  jenisPaket: string;
  jumlah: number;
}

interface TransaksiPaketAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  kategori: TransaksiKategori;
  agen?: AgenDoc;
  pakets: PaketsDoc[];
  catatan?: string;
  periode: PeriodeDoc;
}

interface TransaksiPaketDoc extends mongooseDelete.SoftDeleteDocument {
  no: string;
  tgl: Date;
  jenis: JenisTransaksi;
  kategori: TransaksiKategori;
  agen: AgenDoc;
  pakets: {
    jenisPaket: JenisPaketDoc;
    jumlah: number;
  }[];
  catatan: string;
  periode: PeriodeDoc;
}

interface TransaksiPaketModel
  extends mongooseDelete.SoftDeleteModel<TransaksiPaketDoc> {
  build(attrs: TransaksiPaketAttrs): TransaksiPaketDoc;
}

const transaksiPaketSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      unique: true,
    },
    tgl: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
      enum: Object.values(JenisTransaksi),
      default: JenisTransaksi.MASUK,
    },
    kategori: {
      type: String,
      required: true,
      enum: Object.values(TransaksiKategori),
    },
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
    },
    catatan: String,
    pakets: [
      {
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

transaksiPaketSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

transaksiPaketSchema.statics.build = (attrs: TransaksiPaketAttrs) => {
  return new TransaksiPaket(attrs);
};

const TransaksiPaket = mongoose.model<TransaksiPaketDoc, TransaksiPaketModel>(
  'TransaksiPaket',
  transaksiPaketSchema
);

export { TransaksiPaket, TransaksiPaketAttrs, TransaksiPaketDoc, PaketsDoc };
