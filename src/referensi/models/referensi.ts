import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';

interface ReferensiAttrs {
  judul: string;
  alamat: string;
  noHp: string;
}

interface ReferensiDoc extends mongooseDelete.SoftDeleteDocument {
  judul: string;
  alamat: string;
  noHp: string;
}

interface ReferensiModel extends mongooseDelete.SoftDeleteModel<ReferensiDoc> {
  build(attrs: ReferensiAttrs): ReferensiDoc;
}

const referensiSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
    },
    noHp: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

referensiSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

referensiSchema.statics.build = (attrs: ReferensiAttrs) => {
  return new Referensi(attrs);
};

const Referensi = mongoose.model<ReferensiDoc, ReferensiModel>(
  'Referensi',
  referensiSchema
);

export { Referensi, ReferensiDoc };
