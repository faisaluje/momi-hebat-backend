import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { JenisPaketDoc } from '../../jenis-paket/models/jenis-paket'

interface StokPaketAttrs {
  jenisPaket: JenisPaketDoc;
  jumlah: number;
}

interface StokPaketDoc extends mongooseDelete.SoftDeleteDocument {
  jenisPaket: JenisPaketDoc;
  jumlah: number;
  updatedAt: Date;
}

interface StokPaketModel extends mongooseDelete.SoftDeleteModel<StokPaketDoc> {
  build(attrs: StokPaketAttrs): StokPaketDoc;
}

const stokPaketSchema = new mongoose.Schema(
  {
    jenisPaket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JenisPaket',
      required: true,
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
        delete ret.deleted;
      },
    },
  }
);

stokPaketSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

stokPaketSchema.statics.build = (attrs: StokPaketAttrs) => new StokPaket(attrs);

const StokPaket = mongoose.model<StokPaketDoc, StokPaketModel>(
  'StokPaket',
  stokPaketSchema
);

export { StokPaket, StokPaketAttrs, StokPaketDoc };
