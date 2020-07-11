import { ClientSession } from 'mongoose'

import { Barang, BarangDoc } from '../models/barang'

export class BarangService {
  static async createBarangExists(
    barangNotExists: BarangDoc[],
    session?: ClientSession
  ): Promise<BarangDoc[]> {
    const barangList = await Barang.insertMany(
      barangNotExists.map((barang) => ({ nama: barang.nama })),
      { session }
    );

    return barangList;
  }

  static getBarangNotExists(listBarang: BarangDoc[]): BarangDoc[] {
    return listBarang.filter((barang) => !barang.id);
  }

  static getBarangExists(listBarang: BarangDoc[]): BarangDoc[] {
    return listBarang.filter((barang) => !!barang.id);
  }

  static async getListBarang(
    barangs: BarangDoc[],
    session?: ClientSession
  ): Promise<BarangDoc[]> {
    const barangExists = this.getBarangExists(barangs);
    let listBarang = await Barang.find({
      _id: { $in: barangExists.map((barang) => barang.id) },
    }).session(session || null);

    const barangNotExists = this.getBarangNotExists(barangs);
    if (barangNotExists.length > 0) {
      const newBarangs = await this.createBarangExists(
        barangNotExists,
        session
      );
      listBarang = [...listBarang, ...newBarangs];
    }

    return listBarang;
  }
}
