import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { AgenDoc } from '../../agen/models/agen'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { KartuPaketDoc } from '../../kartu-paket/models/kartu-paket'
import { PeriodeDoc } from '../../periode/models/periode'

interface TransaksiKartuPaketItem {
  kartuPaket: KartuPaketDoc;
  jumlah: number;
}

interface TransaksiKartuPaketAttrs {
  tgl: Date;
  jenis: JenisTransaksi;
  alamat?: string;
  catatan?: string;
  agen?: string;
  items: TransaksiKartuPaketItem[];
  periode: PeriodeDoc;
}

interface TransaksiKartuPaketDoc extends mongooseDelete.SoftDeleteDocument {
  no: string;
  tgl: Date;
  jenis: JenisTransaksi;
  alamat: string;
  catatan: string;
  agen: AgenDoc;
  items: TransaksiKartuPaketItem[];
  periode: PeriodeDoc;
}

interface TransaksiKartuPaketModel
  extends mongooseDelete.SoftDeleteModel<TransaksiKartuPaketDoc> {
  build(attrs: TransaksiKartuPaketAttrs, no: string): TransaksiKartuPaketDoc;
}

const transaksiKartuPaketSchema = new mongoose.Schema(
  {
    no: {
      type: String,
    },
    tgl: {
      type: Date,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
      enum: Object.values(JenisTransaksi),
      default: JenisTransaksi.MASUK,
    },
    alamat: String,
    catatan: String,
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
    },
    items: [
      {
        kartuPaket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KartuPaket',
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

transaksiKartuPaketSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

transaksiKartuPaketSchema.statics.build = (
  attrs: TransaksiKartuPaketAttrs,
  no: string
) =>
  new TransaksiKartuPaket({
    ...attrs,
    no,
  });

const TransaksiKartuPaket = mongoose.model<
  TransaksiKartuPaketDoc,
  TransaksiKartuPaketModel
>('TransaksiKartuPaket', transaksiKartuPaketSchema);

export {
  TransaksiKartuPaket,
  TransaksiKartuPaketAttrs,
  TransaksiKartuPaketDoc,
  TransaksiKartuPaketItem,
};
