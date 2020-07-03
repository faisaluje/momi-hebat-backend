import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { BarangDoc } from '../../barang/models/barang';
import { PeriodeDoc } from '../../periode/models/periode';

interface PaketAttrs {
  nama: string;
  harga: number;
  cashback: number;
  biayaPacking: number;
  barangs: BarangDoc[];
  periode: PeriodeDoc;
}

interface PaketDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  harga: number;
  cashback: number;
  biayaPacking: number;
  barangs: BarangDoc[];
  periode: PeriodeDoc;
}

interface PaketModel extends mongooseDelete.SoftDeleteModel<PaketDoc> {
  build(attrs: PaketAttrs): PaketDoc;
}

const paketSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
      default: 0,
    },
    cashback: {
      type: Number,
      required: true,
      default: 0,
    },
    biayaPacking: {
      type: Number,
      required: true,
      default: 0,
    },
    barangs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barang',
      },
    ],
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
      required: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

paketSchema.statics.build = (attrs: PaketAttrs) => {
  return new Paket(attrs);
};

const Paket = mongoose.model<PaketDoc, PaketModel>('Paket', paketSchema);

export { Paket, PaketAttrs, PaketDoc };
