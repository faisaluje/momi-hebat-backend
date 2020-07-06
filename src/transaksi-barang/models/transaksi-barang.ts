import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import { BarangDoc } from '../../barang/models/barang';
import { PeriodeDoc } from '../../periode/models/periode';

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
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

transaksiBarangSchema.statics.build = (attrs: TransaksiBarangAttrs) => {
  return new TransaksiBarang(attrs);
};

const TransaksiBarang = mongoose.model<
  TransaksiBarangDoc,
  TransaksiBarangModel
>('TransaksiBarang', transaksiBarangSchema);

export { TransaksiBarang, TransaksiBarangAttrs, TransaksiBarangDoc, ItemDoc };
