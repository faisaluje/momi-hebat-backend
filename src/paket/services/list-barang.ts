import mongoose, { ClientSession } from 'mongoose';
import { BarangDoc, Barang } from '../../barang/models/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';

class ListBarang {
  static async callError(session: ClientSession, msg: string): Promise<void> {
    await session.abortTransaction();
    session.endSession();
    throw new BadRequestError(msg);
  }

  static async manipulateListBarang(
    listBarangSelected: BarangDoc[]
  ): Promise<BarangDoc[]> {
    const listBarang = await Barang.find({});
    const newListBarangSelected: BarangDoc[] = [];
    const session = await mongoose.startSession();
    session.startTransaction();

    for (const barang of listBarangSelected) {
      if (!barang.id) {
        if (!barang.nama) {
          await this.callError(session, 'Nama barang tidak boleh kosong');
        }

        const newBarang = Barang.build({ ...barang });
        await newBarang.save();
        newListBarangSelected.push(newBarang);
      } else {
        const barangExist = listBarang.find((val) => val._id === barang.id);
        if (!barangExist) {
          await this.callError(
            session,
            `Barang ${barang.nama} tidak ditemukan`
          );
        }
        newListBarangSelected.push(barangExist!);
      }
    }

    await session.commitTransaction();
    session.endSession();

    return newListBarangSelected;
  }
}

export { ListBarang };
