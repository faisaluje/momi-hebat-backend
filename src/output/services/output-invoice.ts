import * as fs from 'fs';
import Handlebars from 'handlebars';

import { SERVER_URL } from '../../contants';
import { thousandSeparator } from '../../utils';

export class OutputInvoice {
  static generateTemplate(): void {
    const header = fs.readFileSync('templates/invoice-header.hbs', 'utf-8');
    const invoice = fs.readFileSync('templates/invoice.hbs', 'utf-8');
    const footer = fs.readFileSync('templates/invoice-footer.hbs', 'utf-8');

    Handlebars.registerHelper('multiply', function (a: number, b: number) {
      return thousandSeparator(a * b);
    });

    Handlebars.registerHelper('subtract', function (a: number, b: number) {
      return thousandSeparator(a - b);
    });

    Handlebars.registerHelper('sum', function (a: number, b: number) {
      return a + b;
    });

    Handlebars.registerHelper('thousandSeperator', function (amount: number) {
      return thousandSeparator(amount);
    });

    Handlebars.registerHelper('baseUrl', function () {
      return SERVER_URL;
    });

    Handlebars.registerPartial('header', header);
    Handlebars.registerPartial('footer', footer);
    Handlebars.registerPartial('invoice', invoice);
  }
}
