export const checkDataSourceAvailability = () => {
  const num = Math.floor(Math.random() * 2);
  if (num === 1) {
    console.log(`${num}: now using default data source`);
    return true;
  } else {
    console.log(`${num}: using fallback data source`);
    return false;
  }
};
