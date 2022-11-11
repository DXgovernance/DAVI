import { BigNumber, BigNumberish } from 'ethers';

export class SafeBN {
  readonly _hex: string = '';
  readonly _isBigNumber: boolean = false;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      console.warn('SafeBN initialized');
    }
  }

  fromTwos(value: number): BigNumber {
    return null as never;
  }

  toTwos(value: number): BigNumber {
    return null as never;
  }

  abs(): BigNumber {
    return null as never;
  }

  add(other: BigNumberish): BigNumber {
    return null as never;
  }

  sub(other: BigNumberish): BigNumber {
    return null as never;
  }

  div(other: BigNumberish): BigNumber {
    return null as never;
  }

  mul(other: BigNumberish): BigNumber {
    return null as never;
  }

  mod(other: BigNumberish): BigNumber {
    return null as never;
  }

  pow(other: BigNumberish): BigNumber {
    return null as never;
  }

  and(other: BigNumberish): BigNumber {
    return null as never;
  }

  or(other: BigNumberish): BigNumber {
    return null as never;
  }

  xor(other: BigNumberish): BigNumber {
    return null as never;
  }

  mask(value: number): BigNumber {
    return null as never;
  }

  shl(value: number): BigNumber {
    return null as never;
  }

  shr(value: number): BigNumber {
    return null as never;
  }

  eq(other: BigNumberish): boolean {
    return null as never;
  }

  lt(other: BigNumberish): boolean {
    return null as never;
  }

  lte(other: BigNumberish): boolean {
    return null as never;
  }

  gt(other: BigNumberish): boolean {
    return null as never;
  }

  gte(other: BigNumberish): boolean {
    return null as never;
  }

  isNegative(): boolean {
    return null as never;
  }

  isZero(): boolean {
    return null as never;
  }

  toNumber(): number {
    return null as never;
  }

  toBigInt(): bigint {
    return null as never;
  }

  toString(): string {
    return null as never;
  }

  toHexString(): string {
    return null as never;
  }

  toJSON(key?: string): any {
    return null as never;
  }
}

export const isNullOrUndefined = (v: any) =>
  v === null || v === undefined || v === '';

export const bn = (
  n: string | number | BigNumber,
  defaultZero: boolean = false
): BigNumber | undefined => {
  if (isNullOrUndefined(n) && !defaultZero) {
    return new SafeBN();
  }
  try {
    const value = BigNumber.from(n);
    return value;
  } catch (e) {
    return new SafeBN();
  }
};

export const tryDiv = (value: BigNumber, div: BigNumberish) => {
  if (!BigNumber.isBigNumber(value) || isNullOrUndefined(div)) return value;
  return value.div(div);
};
