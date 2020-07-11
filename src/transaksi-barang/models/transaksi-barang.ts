import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { BarangDoc } from '../../barang/models/barang'
import { JenisTransaksi } from '../../common/enums/jenis-transaksi'
import { PeriodeDoc } from '../../periode/models/periode'

interface ItemDoc {
  barang: BarangDoc;
  jumlah: number;
  biaya: number;
}

interface TransaksiBarangAttrs {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  items: ItemDoc[];
  periode: PeriodeDoc;
}

interface TransaksiBarangDoc extends mongooseDelete.SoftDeleteDocument {
  no?: string;
  tgl: Date;
  jenis: JenisTransaksi;
  catatan?: string;
  items: ItemDoc[];
  periode: PeriodeDoc;
}

interface TransaksiBarangModel
  extends mongooseDelete.SoftDeleteModel<TransaksiBarangDoc> {
  build(attrs: TransaksiBarangAttrs): TransaksiBarangDoc;
}

const transaksiBarangSchema = new mongoose.Schema(
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
    catatan: String,
    items: [
      {
        barang: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Barang',
          required: true,
        },
        jumlah: {
          type: Number,
          required: true,
        },
        biaya: {
          type: Number,
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

transaksiBarangSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

transaksiBarangSchema.statics.build = (attrs: TransaksiBarangAttrs) => {
  return new TransaksiBarang(attrs);
};

const TransaksiBarang = mongoose.model<
  TransaksiBarangDoc,
  TransaksiBarangModel
>('TransaksiBarang', transaksiBarangSchema);

export { TransaksiBarang, TransaksiBarangAttrs, TransaksiBarangDoc, ItemDoc };
