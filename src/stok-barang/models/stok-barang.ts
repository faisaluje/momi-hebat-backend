import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { BarangDoc } from '../../barang/models/barang'
import { PeriodeDoc } from '../../periode/models/periode'

interface StokBarangAttrs {
  periode: PeriodeDoc;
  barang: BarangDoc;
  jumlah: number;
}

interface StokBarangDoc extends mongooseDelete.SoftDeleteDocument {
  periode: PeriodeDoc;
  barang: BarangDoc;
  jumlah: number;
  updatedAt: Date;
}

interface StokBarangModel
  extends mongooseDelete.SoftDeleteModel<StokBarangDoc> {
  build(attrs: StokBarangAttrs): StokBarangDoc;
}

const stokBarangSchema = new mongoose.Schema(
  {
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
      required: true,
    },
    barang: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Barang',
    },
    jumlah: {
      type: Number,
      required: true,
      default: 0,
    },
    updatedAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        ret.id - ret._id;
        delete ret._id;
      },
    },
  }
);

stokBarangSchema.statics.build = (attrs: StokBarangAttrs) =>
  new StokBarang(attrs);

const StokBarang = mongoose.model<StokBarangDoc, StokBarangModel>(
  'StokBarang',
  stokBarangSchema
);

export { StokBarang, StokBarangAttrs, StokBarangDoc };
