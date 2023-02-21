import { cmcdTypes, keyTypes, errorTypes } from './constants.js';
import { createError } from './error.js';
import checkQuotes from './utils/checkQuotes.js';

const queryValidator = (queryString) => {
  const error = [];
  let valid = true;

  // Check if the URL is encoded
  if (decodeURI(queryString) === queryString) {
    error.push(createError(errorTypes.parameterEncoding));
    return {
      valid: false,
      queryString,
      error,
    };
  }

  // Check if there is more than one CMCD request
  const query = queryString.split('?').pop();
  const requests = decodeURIComponent(query).split('CMCD=');
  requests.shift();

  if (requests.length > 1) {
    error.push(createError(errorTypes.incorrectFormat));
    return {
      valid: false,
      queryString,
      error,
    };
  }

  const values = decodeURIComponent(query).split('CMCD=')[1].split(',');
  const [rightValue] = values[values.length - 1].split('&');
  values[values.length - 1] = rightValue;

  // console.log("values\n", values);
  const keys = [];

  // Check: key/value is separated by =
  values.forEach((val) => {
    const [key, value] = val.split('=');
    keys.push(key);

    // Check: string require ""

    if ((keyTypes[key] === cmcdTypes.string && !checkQuotes(value))
      || (keyTypes[key] === cmcdTypes.token && checkQuotes(value))
    ) {
      valid = false;
      error.push(createError(errorTypes.invalidValue, key, value));
    }

    // Check: if the key does not have value it must be a bool
    if (
      (typeof value === 'undefined' && keyTypes[key] !== cmcdTypes.boolean)
      || value === 'true'
    ) {
      valid = false;
      error.push(createError(errorTypes.wrongTypeValue, key, value));
    }
  });

  // Check if keys are unique
  console.log('keys\n', keys);

  if ((new Set(keys)).size !== keys.length) {
    error.push(createError(errorTypes.duplicateKey));
    return {
      valid: false,
      queryString,
      error,
    };
  }

  return {
    valid,
    queryString,
    error,
  };
};

export default queryValidator;
