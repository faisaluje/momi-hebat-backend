import { CustomError } from './custom-error';
import ErrorAttrs from '../dto/error-attrs';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to db');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return [{ message: this.reason }];
  }
}
