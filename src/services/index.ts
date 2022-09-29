export { default as musikyApi } from './musikyApi';
export { default as istatic } from './istatic';
export { default as wSocket } from './socket';

const musikyServerStream = 'https://musiky-listen.herokuapp.com';
const musikyLocalStream = 'http://localhost:9870'
const devENV = process.env.NODE_ENV === 'development';
const musikyStreamApi = devENV ? musikyLocalStream : musikyServerStream;
export { musikyStreamApi, devENV };