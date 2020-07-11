import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { AgenDoc } from '../../agen/models/agen'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { PeriodeDoc } from '../../periode/models/periode'
import { TransaksiKategori } from '../enums/transaksi-kategori'
import { TransaksiVia } from '../enums/transaksi-via'

interface TransaksiSaldoAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  agen: AgenDoc;
  via?: TransaksiVia;
  namaBank?: string;
  atasNama?: string;
  kategori: TransaksiKategori;
  nominal: number;
  periode: PeriodeDoc;
}

interface TransaksiSaldoDoc extends mongooseDelete.SoftDeleteDocument {
  no: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  agen: AgenDoc;
  via?: TransaksiVia;
  namaBank: string;
  atasNama?: string;
  kategori: TransaksiKategori;
  nominal: number;
  periode: PeriodeDoc;
}

interface TransaksiSaldoModel
  extends mongooseDelete.SoftDeleteModel<TransaksiSaldoDoc> {
  build(attrs: TransaksiSaldoAttrs): TransaksiSaldoDoc;
}

const transaksiSaldoSchema = new mongoose.Schema(
  {
    no: String,
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
    catatan: String,
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
      required: true,
    },
    via: {
      type: String,
      enum: Object.values(TransaksiVia),
    },
    namaBank: String,
    atasNama: String,
    kategori: {
      type: String,
      required: true,
      enum: Object.values(TransaksiKategori),
    },
    nominal: {
      type: Number,
      required: true,
      default: 0,
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
      },
    },
  }
);

transaksiSaldoSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

transaksiSaldoSchema.statics.build = (attrs: TransaksiSaldoAttrs) => {
  return new TransaksiSaldo(attrs);
};

const TransaksiSaldo = mongoose.model<TransaksiSaldoDoc, TransaksiSaldoModel>(
  'TransaksiSaldo',
  transaksiSaldoSchema
);

export { TransaksiSaldo, TransaksiSaldoAttrs, TransaksiSaldoDoc };
