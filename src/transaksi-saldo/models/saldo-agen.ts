import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { PeriodeDoc } from '../../periode/models/periode';
import { AgenDoc } from '../../agen/models/agen';

interface SaldoAgenAttrs {
  periode: PeriodeDoc;
  saldo: {
    agen: AgenDoc;
    jumlah: number;
    bonus: number;
  }[];
}

interface SaldoAgenDoc extends mongooseDelete.SoftDeleteDocument {
  periode: PeriodeDoc;
  saldo: {
    agen: AgenDoc;
    jumlah: number;
    bonus: number;
    updatedAt: Date;
  }[];
}

interface SaldoAgenModel extends mongooseDelete.SoftDeleteModel<SaldoAgenDoc> {
  build(attrs: SaldoAgenAttrs): SaldoAgenDoc;
}

const saldoAgenSchema = new mongoose.Schema({
  periode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periode',
    required: true,
  },
  saldo: [
    {
      agen: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Agen',
      },
      jumlah: {
        type: Number,
        required: true,
        default: 0,
      },
      bonus: {
        type: Number,
        required: true,
        default: 0,
      },
      updatedAt: Date,
    },
  ],
});

saldoAgenSchema.statics.build = (attrs: SaldoAgenAttrs) => new SaldoAgen(attrs);

const SaldoAgen = mongoose.model<SaldoAgenDoc, SaldoAgenModel>(
  'SaldoAgen',
  saldoAgenSchema
);

export { SaldoAgen, SaldoAgenAttrs, SaldoAgenDoc };
