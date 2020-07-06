import { AgenDoc, Agen } from '../models/agen';
import { ALPHABET } from '../../contants';

export class NoAgen {
  static async generateNoAgen(topAgen: AgenDoc): Promise<string> {
    const subAgenCount = await Agen.countDocuments({ topAgen });
    const no = `${topAgen.no}${ALPHABET[subAgenCount]}`;

    return no;
  }
}
