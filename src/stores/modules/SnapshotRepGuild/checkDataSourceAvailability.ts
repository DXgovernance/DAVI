/*
  This is a test function that switches the default data source
  with a 50% chance, just to check how a (very unreliable)
  data source interaction will look like.
  You should modify the params to make it less annoying.
  In the future, this will contain the actual logic to switch
  between data sources.
*/

export const checkDataSourceAvailability = () => {
  const num = Math.floor(Math.random() * 4);
  if (num !== 0) {
    console.log(`${num}: now using default data source`);
    return true;
  } else {
    console.log(`${num}: using fallback data source`);
    return false;
  }
};
