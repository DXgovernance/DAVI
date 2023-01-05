export const checkDataSourceAvailability = () => true;

// TODO: make a real implementation of checkDataSourceAvailability

/*
  I left this function commented as an example of a check.
  This is a test function that switches the default data source
  with a 25% chance, just to check how a (very unreliable)
  data source interaction will look like.
  In the future, this will contain the actual logic to switch
  between data sources.
*/

// export const checkDataSourceAvailability = () => {
//   const num = Math.floor(Math.random() * 4);
//   if (num !== 0) {
//     console.log(`${num}: now using default data source`);
//     return true;
//   } else {
//     console.log(`${num}: using fallback data source`);
//     return false;
//   }
// };
