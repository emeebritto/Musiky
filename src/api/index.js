const devENV = false;

const prodAPI = 'https://api-musiky.herokuapp.com';
const devAPI = 'http://localhost:8877';

let cache = {};

const urls = {
    quickPicks: ()=> `/msk/random-content/playlists?totalList=1&totalPerList=10&valueExact=true`,
    playLists: ({ listType, totalList=6, totalPerList=15, valueExact=false })=> `/msk/random-content/playlists?totalList=${totalList}&totalPerList=${totalPerList}&listPrefix=${listType}&valueExact=${valueExact}`,
    songsList: ({ totalSong, listType })=> `/msk/random-content/songs?totalSong=${totalSong}&listType=${listType}`,
    suggestionArtists: ({ total })=> `/msk/search/search-suggestions?total=${total}`,
    inputAutoComplete: ({ input, maxResult })=> `/msk/search/auto-complete?input=${input}&maxResult=${maxResult}`,
    greeting: ()=> `/greeting`
};

const api = async (path, options = {})=> {

    let BaseUrl = devENV ? devAPI : prodAPI;

    if(cache[path]) return cache[path];

    try { return fetch(BaseUrl + path, options).then(res=> cache[path] = res.json()) }
    catch(error) { alert(error) }
};


export const msk_get = {

    quickPicks: async () => await api(urls['quickPicks']()).then(({playListDetails})=> playListDetails['mixcs5001eMeb-msk-mU51ky4'].musicList),

    playlists: async (viewMode, configObj) => await api(urls['playLists'](configObj)).then(data=> data[`playList${viewMode}`]),

    songsList: async ({ totalSong, listType }) => await api(urls['songsList']({ totalSong, listType })),

    suggestionArtists: async ({ maxResult }) => await api(urls['suggestionArtists']({ maxResult })),

    completeInput: async ({ input, maxResult }) => await api(urls['inputAutoComplete']({ input, maxResult })),

    greeting: async () => await api(urls['greeting']())
}