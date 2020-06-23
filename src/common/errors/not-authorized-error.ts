import { CustomError } from './custom-error';
import ErrorAttrs from '../dto/error-attrs';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return [{ message: 'Not authorized' }];
  }
}
