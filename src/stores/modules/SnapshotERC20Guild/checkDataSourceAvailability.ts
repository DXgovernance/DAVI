/*
  In this governance implementation we only have one data source (RPC call),
  so the checkDataSourceAvailability will always return true, as we'll
  only use the default source.

*/
export const checkDataSourceAvailability = () => true;
