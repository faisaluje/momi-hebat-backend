import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete';
import { AgenStatus } from '../enums/agen-status';

interface BiodataDoc {
  nama: { lengkap: string; panggilan?: string | null };
  alamat?: {
    jalan?: string | null;
    rt?: string | null;
    rw?: string | null;
    kelurahan?: string | null;
    kecamatan?: string | null;
    kabKota?: string | null;
  };
  lahir: {
    tempat?: string | null;
    tanggal: Date | null;
  };
  pekerjaan?: string | null;
  noTlp?: string | null;
}

interface AgenAttrs {
  no?: string | null;
  diri: BiodataDoc;
  keluarga: BiodataDoc;
  topAgen?: AgenDoc | null;
}

interface AgenDoc extends mongooseDelete.SoftDeleteDocument {
  no: string | null;
  diri: BiodataDoc;
  keluarga: BiodataDoc;
  topAgen: AgenDoc | null;
  level: number;
  status: AgenStatus;
}

interface AgenModel extends mongooseDelete.SoftDeleteModel<AgenDoc> {
  build(attrs: AgenAttrs): AgenDoc;
}

const biodataSchema = new mongoose.Schema(
  {
    nama: { lengkap: String, panggilan: String },
    alamat: {
      jalan: String,
      rt: String,
      rw: String,
      kelurahan: String,
      kecamatan: String,
      kabKota: String,
    },
    lahir: {
      tempat: String,
      tanggal: mongoose.Schema.Types.Date,
    },
    pekerjaan: String,
    noTlp: String,
  },
  {
    _id: false,
  }
);

const agenSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      required: true,
      unique: true,
    },
    diri: biodataSchema,
    keluarga: biodataSchema,
    topAgen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agen',
    },
    level: Number,
    status: {
      type: String,
      required: true,
      enum: Object.values(AgenStatus),
      default: AgenStatus.AKTIF,
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

agenSchema.plugin(mongooseDelete, {
  deletedAt: true,
  deletedBy: true,
  overrideMethods: true,
});

agenSchema.pre('save', async function (next) {
  const topAgen = this.get('topAgen');
  if (this.isNew && topAgen) {
    this.set('level', topAgen.level + 1);
  }
  if (this.isNew && !topAgen) {
    this.set('level', 1);
  }

  if (this.isModified('topAgen')) {
    if (!topAgen) {
      this.set('level', 1);
    } else {
      this.set('level', topAgen.level + 1);
    }
  }
  next();
});

agenSchema.statics.build = (attrs: AgenAttrs) => {
  return new Agen(attrs);
};

const Agen = mongoose.model<AgenDoc, AgenModel>('Agen', agenSchema);

export { Agen, AgenDoc, AgenAttrs };
