import { UpdateStokOptions } from '../../common/dto/update-stok-options';
import { JenisTransaksi } from '../../common/enums/jenis-transaksi';
import { TransaksiSaldoDoc } from '../../transaksi-saldo/models/transaksi-saldo';
import { StokAgen } from '../models/stok-agen';

export class SaldoAgenService {
  static async getSumSaldoAgen(periodeId: string): Promise<{ saldo: number }> {
    try {
      const saldo = await StokAgen.aggregate([
        {
          $match: {
            $and: [{ deleted: { $ne: true } }, { periode: periodeId }],
          },
        },
        {
          $group: {
            _id: '$periode',
            saldo: {
              $sum: '$saldo',
            },
          },
        },
        {
          $project: { saldo: 1, _id: 0 },
        },
      ]);

      return saldo[0];
    } catch (e) {
      console.error(e.message);
      return { saldo: 0 };
    }
  }

  static async upsertSaldoAgen(
    transaksiSaldo: TransaksiSaldoDoc,
    options: UpdateStokOptions
  ): Promise<void> {
    let multiple = transaksiSaldo.jenis == JenisTransaksi.MASUK ? 1 : -1;
    if (options.deleted) {
      multiple = transaksiSaldo.jenis == JenisTransaksi.MASUK ? -1 : 1;
    }

    const filter = {
      agen: transaksiSaldo.agen,
      periode: transaksiSaldo.periode,
    };

    await StokAgen.updateOne(
      filter,
      {
        $inc: { saldo: transaksiSaldo.nominal * multiple },
      },
      { session: options.session, upsert: true }
    );
  }
}
