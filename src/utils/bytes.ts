const BYTES_32_LENGTH = 66;

export function isBytes32(value: string) {
  return (
    value && value.length === BYTES_32_LENGTH && value.substring(0, 2) === '0x'
  );
}
