export { default as musikyApi } from './musikyApi';
export { default as istatic } from './istatic';
export { default as wSocket } from './socket';

const musikyStreamApi = 'https://musiky-listen.herokuapp.com';
const devENV = process.env.NODE_ENV === 'development';
export { musikyStreamApi, devENV };