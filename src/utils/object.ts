interface Obj {
  [key: string]: any;
}

/**
 * @function removeNullValues
 * @description Receive an object and remove 1st level keys with null/undefined values
 * @param obj {}
 * @returns Object
 * @example
 * removeNullValues({ a: 1, b: null}) // returns { a: 1 }
 */
export const removeNullValues = (obj: Obj) => {
  if (Object.keys(obj || {}).length === 0) return {};
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      ...(value !== null && value !== undefined && { [key]: value }),
    };
  }, {});
};
