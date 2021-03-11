import * as fs from 'fs';
import Handlebars from 'handlebars';
import { sumBy } from 'lodash';
import moment from 'moment';

import { NotFoundError } from '../../common/errors/not-foud-error';
import { PackingDoc } from '../../packing/models/packing';
import { PackingService } from '../../packing/services/packing';
import { OutputInvoice } from './output-invoice';
import { PdfService } from './pdf';

export class OutputBookingPaketService {
  static getHtml(context) {
    OutputInvoice.generateTemplate();

    const content = fs.readFileSync('templates/invoice-booking-paket.hbs', 'utf-8');
    const template = Handlebars.compile(content);

    const listBiaya = context.data.items.map(item => {
      const paket = context.listPaket.find(val => val._id === item.paket);
      const total = context.total.biaya[item.paket];

      return {
        paket,
        total,
        jumlah: item.jumlah
      };
    });

    const listCashback = context.data.items.map(item => {
      const paket = context.listPaket.find(val => val._id === item.paket);
      const total = context.total.cashback[item.paket];

      return {
        paket,
        total,
        jumlah: item.jumlah
      };
    });

    const listBonus = context.data.items.map(item => {
      const paket = context.listPaket.find(val => val._id === item.paket);
      const bonus = context.listBonus.find(val => val.paket === item.paket);
      const total = context.total.bonus[item.paket];

      return {
        paket,
        bonus,
        total,
        jumlah: item.jumlah
      };
    });

    const saldo = context.agen.stok.saldo + context.agen.stok.totalBonus;
    const sisaSaldo = (saldo + context.total.allBonus + context.total.allCashback) - context.total.allBiaya;
    
    return template(
      {
        ...context,
        tgl: context.data.tgl
          ? moment(context.data.tgl).utcOffset(7).format('D MMMM YYYY')
          : '',
        no: 'Booking Paket',
        saldo,
        kategori: true,
        listBiaya,
        listCashback,
        listBonus,
        sisaSaldo
      },
      {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true,
      }
    );
  }

  static async getPdf(data: any): Promise<Buffer> {
    const html = this.getHtml(data);
    const pdf = await PdfService.generatePdf(html, {
      width: '215mm',
      height: '140mm',
    });

    return pdf;
  }
}
