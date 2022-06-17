import { io } from "socket.io-client";

class WSocket {
	public devENV:boolean;
  private musikyListenDEV:string;
  private musikyListenPROD:string;
  public baseUrl:string;
  private ioInstance:any;
	constructor() {
		this.devENV = process.env.NODE_ENV === 'development';
    this.musikyListenDEV = `ws://localhost:9870`;
    this.musikyListenPROD = 'https://musiky-listen.herokuapp.com';
		this.baseUrl = this.devENV ? this.musikyListenDEV : this.musikyListenPROD;
		this.ioInstance = io(this.baseUrl);
	}

	get connection() {
		return this.ioInstance;
	}
}

const wSocket = new WSocket();
export default wSocket;
