import Ajv from 'ajv';

const ajv = new Ajv({
  coerceTypes: true
});

function ValidationError(errors) {
  this.name = 'ValidationError';
  this.message = 'Validation error.';
  this.errors = errors;
}
ValidationError.prototype = new Error();

export { ajv, ValidationError };
