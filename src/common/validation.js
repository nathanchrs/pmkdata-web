import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({
  coerceTypes: true,
  allErrors: true,
  jsonPointers: true,
  errorDataPath: 'property'
});
ajvErrors(ajv);

function createValidator(schema) {
  const validate = ajv.compile(schema);
  return (values) => {
    let isValid = validate(values);
    if (isValid) {
      return {};
    } else {
      const errors = {}
      validate.errors.forEach((error) => {
        errors[error.dataPath.split('/').filter(str => str)[0]] = error.message
      });
      return errors;
    }
  }
}

export { createValidator };
