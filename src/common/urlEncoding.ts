class URLEncoding {
  url:string;

  constructor(url:string) {
    this.url = url
  }

  decoder():string {
    this.url = this.url.replace(/H2%/g, "https://");
    this.url = this.url.replace(/H1%/g, "http://");
    this.url = this.url.replace(/B3%/g, "/");
    this.url = this.url.replace(/I7%/g, "?");
    this.url = this.url.replace(/E3%/g, "=");
    this.url = this.url.replace(/E7%/g, "&");
    this.url = this.url.replace(/W1%/g, "www");
    this.url = this.url.replace(/E4%/g, ".com");
    this.url = this.url.replace(/P3%/g, ".");
    this.url = this.url.replace(/P2%/g, ":");
    return this.url;
  }

  encoder():string {
    this.url = this.url.replace(/https:\/\//g, "H2%");
    this.url = this.url.replace(/http:\/\//g, "H1%");
    this.url = this.url.replace(/\//g, "B3%");
    this.url = this.url.replace(/\?/g, "I7%");
    this.url = this.url.replace(/\=/g, "E3%");
    this.url = this.url.replace(/\&/g, "E7%");
    this.url = this.url.replace(/www/g, "W1%");
    this.url = this.url.replace(/\.com/g, "E4%");
    this.url = this.url.replace(/\./g, "P3%");
    this.url = this.url.replace(/:/g, "P2%");
    return this.url;
  }
}

const urlEncoding = (url:string): URLEncoding => new URLEncoding(url);
export default urlEncoding;