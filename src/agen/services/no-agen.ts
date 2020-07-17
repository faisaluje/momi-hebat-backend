import { numberToAlphabet } from '../../utils'
import { Agen, AgenDoc } from '../models/agen'

export class NoAgen {
  static async generateNoAgen(topAgen: AgenDoc): Promise<string> {
    const subAgenCount = await Agen.countWithDeleted({ topAgen });
    const no = `${topAgen.no}/${numberToAlphabet(subAgenCount + 1)}`;

    return no;
  }
}
