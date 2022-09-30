class N2xNordlyApi {
  public devENV:boolean;
  private n2xDEV:string;
  private n2xPROD:string;
  public url:string;

  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.n2xDEV = `http://localhost:${3080}`;
    this.n2xPROD = 'https://n2x-nordly.herokuapp.com';
    this.url = this.devENV ? this.n2xDEV : this.n2xPROD;
  }
}

const n2xNordlyApi = new N2xNordlyApi();
export default n2xNordlyApi;
