import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

const ajv = new Ajv({
  coerceTypes: true,
  allErrors: true,
  jsonPointers: true,
  errorDataPath: 'property',
  format: 'full'
});
ajvErrors(ajv);

function createValidator (schema) {
  const validate = ajv.compile(schema);
  return (values) => {
    let isValid = validate(values);
    if (isValid) {
      return {};
    } else {
      const errors = {};
      validate.errors.forEach((error) => {
        let property = error.dataPath.split('/').filter(str => str)[0];
        if (!property) property = '_error';
        errors[property] = error.message;
      });
      return errors;
    }
  };
}

export { createValidator };
