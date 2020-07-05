import { BarangDoc, Barang } from '../../barang/models/barang';
import { BadRequestError } from '../../common/errors/bad-request-error';

class ListBarang {
  static async manipulateListBarang(
    listBarangSelected: BarangDoc[]
  ): Promise<BarangDoc[]> {
    const listBarang = await Barang.find({});
    const newListBarang: BarangDoc[] = [];
    let newListBarangSelected: BarangDoc[] = [];

    try {
      for (const barang of listBarangSelected) {
        if (!barang.id) {
          if (!barang.nama) {
            throw new BadRequestError('Nama barang tidak boleh kosong');
          }

          newListBarang.push(barang);
        } else {
          const barangExist = listBarang.find((val) => val._id === barang.id);
          if (!barangExist) {
            throw new BadRequestError(`Barang ${barang.nama} tidak ditemukan`);
          }
          newListBarangSelected.push(barangExist!);
        }
      }

      if (newListBarang.length > 0) {
        const newBarangs = await Barang.insertMany(newListBarang);
        newListBarangSelected = [...newListBarangSelected, ...newBarangs];
      }

      return newListBarangSelected;
    } catch (e) {
      throw e;
    }
  }
}

export { ListBarang };
