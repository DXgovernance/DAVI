import { removeNullValues } from './object';

describe('removeNullValues', () => {
  it('Should remove keys with empty values', () => {
    expect(removeNullValues({ a: 1, b: null })).toStrictEqual({ a: 1 });
  });
  it('Should not remove keys with zero values', () => {
    expect(removeNullValues({ a: 1, b: 0 })).toStrictEqual({ a: 1, b: 0 });
  });
});
