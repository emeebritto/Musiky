export { default as musiky } from './musikyApi';
export { default as istatic } from './istatic';
export { default as wSocket } from './socket';
export { default as n2xNordlyApi } from './n2x-nordly';

const musikyServerStream = 'https://musiky-listen.herokuapp.com';
const musikyLocalStream = 'http://localhost:9870'
const devENV = process.env.NODE_ENV === 'development';
const musikyStreamApi = devENV ? musikyLocalStream : musikyServerStream;
export { musikyStreamApi, devENV };
