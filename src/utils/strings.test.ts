import { capitalizeFirstLetter } from './strings';

describe('capitalizeFirstLetter', () => {
  it('Should return value', () => {
    const Arr = [];
    expect(capitalizeFirstLetter(1 as any)).toBe(1);
    expect(capitalizeFirstLetter(Arr as any)).toBe(Arr);
    expect(capitalizeFirstLetter('s')).toBe('S');
    expect(capitalizeFirstLetter('hola')).toBe('Hola');
    expect(capitalizeFirstLetter('Hola')).toBe('Hola');
  });
});
