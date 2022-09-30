export function capitalizeFirstLetter(value: string): string {
  if (!value || typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 *
 * @param {String} string
 * @returns {String}
 * @description convert string to lowercase, remove spaces, remove special chars, remove numbers, remove accents
 * @example
 * normalize(' 123 ABC --/?+=  SÉ[ET') // will return "123abcseet"
 */
interface Config {
  allowNumbers?: boolean;
}
export function normalizeString(
  value: string,
  config: Config = { allowNumbers: true }
): string {
  const anythingButLetters = '[^A-Za-z]';
  const anythingButLettersAndNumbers = '[^A-Za-z0-9]';
  const regexp = new RegExp(
    config.allowNumbers ? anythingButLettersAndNumbers : anythingButLetters,
    'g'
  );
  return value && typeof value === 'string'
    ? value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(regexp, '')
    : '';
}
