import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { BarangDoc } from '../../barang/models/barang';
import { PeriodeDoc } from '../../periode/models/periode';
import { Paket } from '../../paket/models/paket';

interface StokBarangAttrs {
  periode: PeriodeDoc;
  stok: {
    barang: BarangDoc;
    jumlah: number;
  }[];
}

interface StokBarangDoc extends mongooseDelete.SoftDeleteDocument {
  periode: PeriodeDoc;
  stok: {
    barang: BarangDoc;
    jumlah: number;
  }[];
}

interface StokBarangModel
  extends mongooseDelete.SoftDeleteModel<StokBarangDoc> {
  build(attrs: StokBarangAttrs): StokBarangDoc;
}

const stokBarangSchema = new mongoose.Schema({
  periode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Periode',
    required: true,
  },
  stok: [
    {
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
    },
  ],
});

stokBarangSchema.statics.build = (attrs: StokBarangAttrs) => new Paket(attrs);

const StokBarang = mongoose.model<StokBarangDoc, StokBarangModel>(
  'StokBarang',
  stokBarangSchema
);

export { StokBarang, StokBarangAttrs, StokBarangDoc };
