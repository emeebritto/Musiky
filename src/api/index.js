import axios from 'axios';
axios.get('https://musiky-listen.herokuapp.com');

const devENV = process.env.NODE_ENV === 'development';

//const prodAPI = 'https://api-musiky.herokuapp.com';
//const devAPI = 'http://localhost:9874';

const istatic_LOCAL_URL = `http://localhost:${9872}/`;
const istaticURL = 'https://cdn-istatics.herokuapp.com/';

//export const BaseUrl = devENV ? devAPI : prodAPI;
export const IstaticBaseUrl = devENV ? istatic_LOCAL_URL : istaticURL;
