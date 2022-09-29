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
 * normalize(' 123 ABC --/?+=  SÉ[ET') // will return "abcseet"
 */
export function normalizeString(value: string): string {
  return value && typeof value === 'string'
    ? value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z]/g, '')
    : '';
}
