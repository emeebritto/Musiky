const devENV = false;

const prodAPI = 'https://api-musiky.herokuapp.com';
const devAPI = 'http://localhost:9877';

let cache = {};

const pathsList = {
    quickPicks: ()=> `/msk/random-content/playlists?totalList=1&totalPerList=10&valueExact=true`,
    playLists: ({ listType, totalList=6, totalPerList=15, valueExact=false })=> `/msk/random-content/playlists?totalList=${totalList}&totalPerList=${totalPerList}&listPrefix=${listType}&valueExact=${valueExact}`,
    songsList: ({ totalSong, listType })=> `/msk/random-content/songs?totalSong=${totalSong}&listType=${listType}`,
    suggestionArtists: ({ maxResult })=> `/msk/search/search-suggestions?total=${maxResult}`,
    inputAutoComplete: ({ input, maxResult })=> `/msk/search/auto-complete?input=${input}&maxResult=${maxResult}`,
    greeting: ()=> `/greeting`
};

export const msk_get = async (pathName, argsObj ={}, options ={})=> {

    let path = pathsList[pathName](argsObj);

    let BaseUrl = devENV ? devAPI : prodAPI;

    if(cache[path]) return cache[path];

    try { return fetch(BaseUrl + path, options).then(res=> cache[path] = res.json()) }
    catch(error) { alert(error) }
};
