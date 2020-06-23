import { CustomError } from './custom-error';
import ErrorAttrs from '../dto/error-attrs';

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return [{ message: this.message }];
  }
}
