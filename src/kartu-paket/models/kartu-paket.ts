import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { PeriodeDoc } from '../../periode/models/periode'
import { PeriodeAktif } from '../../periode/services/periode-aktif'

interface KarutPaketAttrs {
  nama: string;
}

interface KartuPaketDoc extends mongooseDelete.SoftDeleteDocument {
  nama: string;
  stok: number;
  periode: PeriodeDoc;
}

interface KartuPaketModel
  extends mongooseDelete.SoftDeleteModel<KartuPaketDoc> {
  build(attrs: KarutPaketAttrs): KartuPaketDoc;
}

const kartuPaketSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    stok: {
      type: Number,
      required: true,
      default: 0,
    },
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
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
      virtuals: true,
    },
  }
);

kartuPaketSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

kartuPaketSchema.pre('save', async function (next) {
  if (this.isNew) {
    const periodeAktif = await PeriodeAktif.getPeriodeAktif();
    this.set('periode', periodeAktif);
  }

  next();
});

kartuPaketSchema.statics.build = (attrs: KarutPaketAttrs) =>
  new KartuPaket(attrs);

const KartuPaket = mongoose.model<KartuPaketDoc, KartuPaketModel>(
  'KartuPaket',
  kartuPaketSchema
);

export { KartuPaket, KarutPaketAttrs, KartuPaketDoc };
