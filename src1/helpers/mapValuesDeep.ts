import mapValues from 'just-map-values';

interface CallbackObject {
  key: string;
  value: unknown;
  scope: string;
}

const mapValuesDeep = (object: object, callback: (event: CallbackObject) => unknown, scope = ''): object =>
  mapValues(object, (value, key) => {
    const type = typeof value;

    if (type === 'object') {
      // Update the scope and map the object
      return mapValuesDeep(value, callback, (scope ? `${scope}.` : '') + key);
    }

    return callback({ key, value, scope });
  });

export default mapValuesDeep;
