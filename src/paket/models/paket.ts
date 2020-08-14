import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

import { JenisPaketDoc } from '../../jenis-paket/models/jenis-paket';
import { PaketStatus } from '../enums/paket-status';

interface PaketAttrs {
  nama: string;
  harga: number;
  cashback: number;
  jenisPaket: string;
  bgColor?: string;
}

interface PaketDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  harga: number;
  cashback: number;
  biayaPacking: number;
  jenisPaket: JenisPaketDoc;
  status: PaketStatus;
  bgColor: string;
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
      default: 0,
    },
    jenisPaket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JenisPaket',
      required: true,
    },
    bgColor: {
      type: String,
      default: '#FFF',
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(PaketStatus),
      default: PaketStatus.AKTIF,
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

paketSchema.statics.build = (attrs: PaketAttrs) => {
  return new Paket(attrs);
};

const Paket = mongoose.model<PaketDoc, PaketModel>('Paket', paketSchema);

export { Paket, PaketAttrs, PaketDoc };
