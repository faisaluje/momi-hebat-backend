import mongoose from 'mongoose'

export function numberToAlphabet(num: number) {
  var s = '',
    t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = ((num - t) / 26) | 0;
  }
  return s || undefined;
}

export function compareObjectId(sourceId: any, targetId: any): boolean {
  return mongoose.Types.ObjectId(sourceId).equals(targetId);
}
