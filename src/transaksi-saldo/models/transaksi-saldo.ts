import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import { AgenDoc } from '../../agen/models/agen';
import { PeriodeDoc } from '../../periode/models/periode';
import { TransaksiVia } from '../enums/transaksi-via';
import { TransaksiKategori } from '../enums/transaksi-kategori';
interface TransaksiSaldoAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  agen: AgenDoc;
  via?: TransaksiVia;
  atasNama?: string;
  kategori: TransaksiKategori;
  periode: PeriodeDoc;
}

interface TransaksiSaldoDoc extends mongooseDelete.SoftDeleteDocument {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  agen: AgenDoc;
  via?: TransaksiVia;
  atasNama?: string;
  kategori: TransaksiKategori;
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
    atasNama: String,
    kategori: {
      type: String,
      required: true,
      enum: Object.values(TransaksiKategori),
    },
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

transaksiSaldoSchema.statics.build = (attrs: TransaksiSaldoAttrs) => {
  return new TransaksiSaldo(attrs);
};

const TransaksiSaldo = mongoose.model<TransaksiSaldoDoc, TransaksiSaldoModel>(
  'TransaksiSaldo',
  transaksiSaldoSchema
);

export { TransaksiSaldo, TransaksiSaldoAttrs, TransaksiSaldoDoc };
