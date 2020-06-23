import { CustomError } from './custom-error';
import ErrorAttrs from '../dto/error-attrs';
import { ValidationError } from 'express-validator';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(private errors: ValidationError[]) {
    super('Invalid request paramaters');

    // Only because we are extending a built in Class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): ErrorAttrs[] {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
