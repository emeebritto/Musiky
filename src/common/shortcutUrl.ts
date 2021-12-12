export class ShortCutUrl {
  constructor() {
    throw Error("No constructor");
  }

  static normalizeUrl(url: string): string {
    url = url.replace(/H2%/g, "https://");
    url = url.replace(/H1%/g, "http://");
    url = url.replace(/B3%/g, "/");
    url = url.replace(/I7%/g, "?");
    url = url.replace(/E3%/g, "=");
    url = url.replace(/E7%/g, "&");
    url = url.replace(/W1%/g, "www");
    url = url.replace(/E4%/g, ".com");
    url = url.replace(/P3%/g, ".");
    return url;
  }

  static codeUrl(url: string): string {
    url = url.replace(/https:\/\//g, "H2%");
    url = url.replace(/http:\/\//g, "H1%");
    url = url.replace(/\//g, "B3%");
    url = url.replace(/\?/g, "I7%");
    url = url.replace(/\=/g, "E3%");
    url = url.replace(/\&/g, "E7%");
    url = url.replace(/www/g, "W1%");
    url = url.replace(/\.com/g, "E4%");
    url = url.replace(/\./g, "P3%");
    return url;
  }
}
