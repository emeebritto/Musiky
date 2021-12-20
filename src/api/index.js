const devENV = true;

const prodAPI = 'https://api-musiky.herokuapp.com';
const devAPI = 'http://localhost:9874';

const istatic_LOCAL_URL = `http://localhost:${9872}/`;
const istaticURL = 'https://cdn-istatics.herokuapp.com/';

let cache = {};

const pathsList = {
    quickPicks: () => `/random/playlists?totalList=1`,
    randomPlaylists: ({label, totalList=6})=> `/random/playlists?totalList=${totalList}&label=${label}`,
    randomArtists: ({maxResult})=> `/random/artists?maxResult=${maxResult}`,
    getArtists: ({maxResult})=> `/artist/getArtistsPerPage?page=20`,
    artist: ({ q })=> `/artist/${q}`,
    playlist: ({ id })=> `/playlist/${id}`,
    songsList: ({type, maxResult})=> `/random/songs?maxResult=${maxResult}&listType=${type}`,
    suggestionArtists: ({maxResult})=> `/search/search-suggestions?total=${maxResult}`,
    inputAutoComplete: ({input, maxResult})=> `/search/auto-complete?input=${input}&maxResult=${maxResult}`,
    search: ({q})=> `/search/${q}`,
    greeting: ()=> `/greeting`,
};

export const msk_get = async (pathName, argsObj ={}, options ={})=> {

    let path = pathsList[pathName](argsObj);

    let BaseUrl = devENV ? devAPI : prodAPI;

    if(cache[path]) return cache[path];

    console.log(`FAZENDO REQUESTE PARA ${BaseUrl}${path}`);

    try {
        return fetch(BaseUrl + path, options).then(res=> cache[path] = res.json())
    } catch(error) {
        console.log(error);
    }
};

export const allMusic = async ({ page }) => {

    let URL = `${devENV ? istatic_LOCAL_URL : istaticURL}music/all?page=${page}`;
    let OPTIONS = {};

    try { return fetch(URL , OPTIONS).then(res=> res.json()) }
    catch(error) { alert(error) }
};

export const getLyric = async ({ title, artistRef }) => {

    let URL =  devENV ? istatic_LOCAL_URL : istaticURL;
    let OPTIONS = {};

    try { return fetch(URL + `music/lyric?title=${title}&artistRef=${artistRef}` , OPTIONS).then(res=> res.json()) }
    catch(error) { alert(error) }
};