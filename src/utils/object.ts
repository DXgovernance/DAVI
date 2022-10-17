interface Obj {
  [key: string]: any;
}
export const removeNullValues = (obj: Obj) => {
  if (Object.keys(obj || {}).length === 0) return {};
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      ...(!!value && { [key]: value }),
    };
  }, {});
};
