export const getBaseUrlForServer = function () {
  const BASE_URL =
    process.env.APP_ENV === "dev" ? process.env.DEV_URL : process.env.PROD_URL;
  return BASE_URL;
};
