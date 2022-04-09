const devENV = process.env.NODE_ENV === 'development';
const istaticDEV = `http://localhost:${9872}`;
const istaticPROD = 'https://cdn-istatics.herokuapp.com';
const baseUrl = devENV ? istaticDEV : istaticPROD;
const staticSourcesUrl = `${baseUrl}/static/`;

// API WRAPPER
class Istatic {
  contructor() {
    throw new Error ("The contructor should not be initialized");
  }

  static profileImg(id: null | string = null) {
    return `${baseUrl}/user-img/guest_temp`;
  }

  static iconUrl({ name, color='white', format='svg', dp=24 }) {
    return `${baseUrl}/static/icons/${name}_${color}_${dp}dp.${format}`;
  }

  static imgUrl({ path }) {
    return `${baseUrl}/static/imgs/${path}`;
  }

  static animatedSvgUrl({ name }) {
    return `${baseUrl}/static/icons/AnimatedSvg/${name}.svg`;
  }

  static staticPath(pathName) {
    return `${baseUrl}/static/${pathName}`;
  }
}

export default Istatic;
