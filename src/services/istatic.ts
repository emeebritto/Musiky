const devENV: boolean = process.env.NODE_ENV === 'development';
const istaticDEV = `http://localhost:${9872}`;
const istaticPROD = 'https://cdn-istatics.herokuapp.com';
const baseUrl: string = devENV ? istaticDEV : istaticPROD;
const staticSourcesUrl = `${baseUrl}/static/`;

// API WRAPPER
class Istatic {
  contructor() {
    throw new Error ("The contructor must not be initialized");
  }

  static profileImg(id: null | string = null) {
    return `${baseUrl}/user-img/guest_temp`;
  }

  static iconUrl({
    name, color='white', format='svg', dp=24
  }:{
    name: string,
    color?: string,
    format?: string,
    dp?: number
  }): string {
    return `${baseUrl}/static/icons/${name}_${color}_${dp}dp.${format}`;
  }

  static imgUrl({ path }:{ path: string }): string {
    return `${baseUrl}/static/imgs/${path}`;
  }

  static animatedSvgUrl({ name }:{ name: string }): string {
    return `${baseUrl}/static/icons/AnimatedSvg/${name}.svg`;
  }

  static staticPath(pathName: string): string {
    return `${baseUrl}/static/${pathName}`;
  }
}

export default Istatic;
