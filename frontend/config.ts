const DEV_ENDPOINT = 'http://localhost/7777/graphql';
const PROD_ENDPOINT = '';

export const ENDPOINT =
  process.env.NODE_ENV === 'development' ? DEV_ENDPOINT : PROD_ENDPOINT;
