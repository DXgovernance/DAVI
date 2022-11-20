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
    return '' as never;
  }

  toTwos(value: number): BigNumber {
    return '' as never;
  }

  abs(): BigNumber {
    return '' as never;
  }

  add(other: BigNumberish): BigNumber {
    return '' as never;
  }

  sub(other: BigNumberish): BigNumber {
    return '' as never;
  }

  div(other: BigNumberish): BigNumber {
    return '' as never;
  }

  mul(other: BigNumberish): BigNumber {
    return '' as never;
  }

  mod(other: BigNumberish): BigNumber {
    return '' as never;
  }

  pow(other: BigNumberish): BigNumber {
    return '' as never;
  }

  and(other: BigNumberish): BigNumber {
    return '' as never;
  }

  or(other: BigNumberish): BigNumber {
    return '' as never;
  }

  xor(other: BigNumberish): BigNumber {
    return '' as never;
  }

  mask(value: number): BigNumber {
    return '' as never;
  }

  shl(value: number): BigNumber {
    return '' as never;
  }

  shr(value: number): BigNumber {
    return '' as never;
  }

  eq(other: BigNumberish): boolean {
    return '' as never;
  }

  lt(other: BigNumberish): boolean {
    return '' as never;
  }

  lte(other: BigNumberish): boolean {
    return '' as never;
  }

  gt(other: BigNumberish): boolean {
    return '' as never;
  }

  gte(other: BigNumberish): boolean {
    return '' as never;
  }

  isNegative(): boolean {
    return '' as never;
  }

  isZero(): boolean {
    return '' as never;
  }

  toNumber(): number {
    return '' as never;
  }

  toBigInt(): bigint {
    return '' as never;
  }

  toString(): string {
    return '' as never;
  }

  toHexString(): string {
    return '' as never;
  }

  toJSON(key?: string): any {
    return '' as never;
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
