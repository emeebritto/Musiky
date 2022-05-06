import { io } from "socket.io-client";

class WSocket {
	devENV:boolean;
  musikyListenDEV:string;
  musikyListenPROD:string;
  baseUrl:string;
  ioInstance:any;


	constructor() {
		this.devENV = process.env.NODE_ENV === 'development';
    this.musikyListenDEV = `ws://localhost:9870`;
    this.musikyListenPROD = 'ws://musiky-listen.herokuapp.com';
		this.baseUrl = this.devENV ? this.musikyListenDEV : this.musikyListenPROD;
		this.ioInstance = io(this.baseUrl);
	}

	connection() {
		return this.ioInstance;
	}
}

const wSocket = new WSocket();
export default wSocket;
