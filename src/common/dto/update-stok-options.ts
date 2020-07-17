import { ClientSession } from 'mongoose'

export interface UpdateStokOptions {
  deleted?: boolean;
  session?: ClientSession;
}
