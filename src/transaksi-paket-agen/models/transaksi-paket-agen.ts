import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { AgenDoc } from '../../agen/models/agen'
import { PaketDoc } from '../../paket/models/paket'
import { PeriodeDoc } from '../../periode/models/periode'
import { JenisTransaksiPaketAgen } from '../enums/jenis-transaksi-paket-agen'

interface TransaksiPaketAgenAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksiPaketAgen;
  agen: string;
  items: {
    paket: string;
    jumlah: number;
  }[];
  alamat?: string;
  catatan?: string;
  periode: PeriodeDoc;
}

interface TransaksiPaketAgenDoc extends mongooseDelete.SoftDeleteDocument {
  no: string;
  tgl: Date;
  jenis: JenisTransaksiPaketAgen;
  agen: AgenDoc;
  items: {
    paket: PaketDoc;
    jumlah: number;
  }[];
  alamat: string;
  catatan: string;
  periode: PeriodeDoc;
}

interface TransaksiPaketAgenModel
  extends mongooseDelete.SoftDeleteModel<TransaksiPaketAgenDoc> {
  build(attrs: TransaksiPaketAgenAttrs): TransaksiPaketAgenDoc;
}

const transaksiPaketAgenSchema = new mongoose.Schema(
  {
    no: String,
    tgl: {
      type: mongoose.Schema.Types.Date,
      required: true,
    },
    jenis: {
      type: String,
      required: true,
      enum: Object.values(JenisTransaksiPaketAgen),
      default: JenisTransaksiPaketAgen.PENGAMBILAN,
    },
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Agen',
    },
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
    catatan: String,
    alamat: String,
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

transaksiPaketAgenSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

transaksiPaketAgenSchema.statics.build = (attrs: TransaksiPaketAgenAttrs) =>
  new TransaksiPaketAgen(attrs);

const TransaksiPaketAgen = mongoose.model<
  TransaksiPaketAgenDoc,
  TransaksiPaketAgenModel
>('TransaksiPaketAgen', transaksiPaketAgenSchema);

export { TransaksiPaketAgen, TransaksiPaketAgenAttrs, TransaksiPaketAgenDoc };
