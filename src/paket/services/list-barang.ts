import mongoose from 'mongoose';
import Transaction from 'mongoose-transactions-typescript';
import { BarangDoc, Barang } from '../../barang/models/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';

class ListBarang {
  static async manipulateListBarang(
    listBarangSelected: BarangDoc[]
  ): Promise<BarangDoc[]> {
    const listBarang = await Barang.find({});
    const newListBarangSelected: BarangDoc[] = [];
    const transaction = new Transaction(true);

    try {
      for (const barang of listBarangSelected) {
        if (!barang.id) {
          if (!barang.nama) {
            throw new BadRequestError('Nama barang tidak boleh kosong');
          }

          transaction.insert('Barang', barang);
          const newBarang = await transaction.run();
          newListBarangSelected.push(newBarang[0]);
        } else {
          const barangExist = listBarang.find((val) => val._id === barang.id);
          if (!barangExist) {
            throw new BadRequestError(`Barang ${barang.nama} tidak ditemukan`);
          }
          newListBarangSelected.push(barangExist!);
        }
      }

      return newListBarangSelected;
    } catch (e) {
      await transaction.rollback();
      transaction.clean();
      throw e;
    }
  }
}

export { ListBarang };
