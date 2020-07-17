import mongoose from 'mongoose'
import mongooseDelete from 'mongoose-delete'

import { KartuPaketDoc } from '../../kartu-paket/models/kartu-paket'
import { PaketDoc } from '../../paket/models/paket'
import { PeriodeDoc } from '../../periode/models/periode'
import { AgenDoc } from './agen'

interface StokAgenAttrs {
  agen: string;
  saldo: number;
  bonus: number;
  kartuPakets: {
    kartuPaket: string;
    jumlah: number;
  }[];
  pakets: {
    paket: string;
    jumlah: number;
  }[];
  periode: string;
}

interface StokAgenDoc extends mongooseDelete.SoftDeleteDocument {
  agen: AgenDoc;
  saldo: number;
  bonus: number;
  kartuPakets: {
    kartuPaket: KartuPaketDoc;
    jumlah?: number;
  }[];
  pakets: {
    paket: PaketDoc;
    jumlah?: number;
  }[];
  periode: PeriodeDoc;
}

interface StokAgenModel extends mongooseDelete.SoftDeleteModel<StokAgenDoc> {
  build(attr: StokAgenAttrs): StokAgenDoc;
}

const stokAgenSchema = new mongoose.Schema(
  {
    agen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
      required: true,
    },
    periode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Periode',
      required: true,
    },
    saldo: Number,
    bonus: Number,
    kartuPakets: [
      {
        kartuPaket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'KartuPaket',
        },
        jumlah: Number,
      },
    ],
    pakets: [
      {
        paket: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Paket',
        },
        jumlah: Number,
      },
    ],
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

stokAgenSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
  indexFields: 'deleted',
});

stokAgenSchema.statics.build = (attrs: StokAgenAttrs) => new StokAgen(attrs);

const StokAgen = mongoose.model<StokAgenDoc, StokAgenModel>(
  'StokAgen',
  stokAgenSchema
);

export { StokAgen, StokAgenAttrs, StokAgenDoc };
