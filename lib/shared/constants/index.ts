const BASE_URL = process.env.APP_ENV === "dev" ? process.env.DEV_URL : process.env.PROD_URL

export default BASE_URL