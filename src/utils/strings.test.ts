import { capitalizeFirstLetter, normalizeString } from './strings';

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

describe('normalizeString', () => {
  it('Should return correct value', () => {
    expect(normalizeString(null)).toEqual('');
    expect(normalizeString(' 123 ABC --/?+=  SÉ[ET')).toEqual('123abcseet');
  });
  it('Should accept numbers by default', () => {
    expect(normalizeString('1')).toEqual('1');
  });
  it('Should mask numbers if config.allowNumbers=false', () => {
    expect(normalizeString('1', { allowNumbers: false })).toEqual('');
    expect(normalizeString('test123test40t', { allowNumbers: false })).toEqual(
      'testtestt'
    );
  });
});
