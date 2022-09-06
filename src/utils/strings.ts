export function capitalizeFirstLetter(value: string): string {
  if (!value || typeof value !== 'string') return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function camelCaseToSplitWordsString(value: string): string {
  if (!value || typeof value !== 'string') return value;
  return value.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function capitalizeFirstLetterMultiWord(value: string) {
  if (!value || typeof value !== 'string') return value;
  return value.split(' ').map(capitalizeFirstLetter).join(' ');
}
