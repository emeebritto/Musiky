export { default as wSocket } from './socket';
export { default as istatic } from './istatic';
export { default as musiky } from './musikyApi';
export { default as n2xNordlyApi } from './n2x-nordly';

export { default as dSpot } from './dspot';

const musikyStreamServer = 'https://emee-yt-stream.hf.space';
const musikyLocalStream = 'http://localhost:7060'
const devENV = process.env.NODE_ENV === 'development';
const musikyStreamApi = devENV ? musikyLocalStream : musikyStreamServer;
export { musikyStreamApi, devENV };
