import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

interface BarangAttrs {
  nama: string;
  keterangan?: string;
}

interface BarangDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  keterangan?: string;
}

interface BarangModel extends mongooseDelete.SoftDeleteModel<BarangDoc> {
  build(attrs: BarangAttrs): BarangDoc;
}

const barangSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    keterangan: String,
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.deleted;
      },
    },
    versionKey: false,
  }
);

barangSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

barangSchema.statics.build = (attrs: BarangAttrs) => {
  return new Barang(attrs);
};

const Barang = mongoose.model<BarangDoc, BarangModel>('Barang', barangSchema);

export { barangSchema, Barang, BarangDoc };
