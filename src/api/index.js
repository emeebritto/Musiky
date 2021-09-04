const musikyAPI_Base = 'https://api-musiky.herokuapp.com'

const randomPlaylists = `${musikyAPI_Base}/msk/random-content/playlists?totalList=1&totalPerList=10&valueExact=true`

let cache = {
    quickPicks: [],
    playLists: {},
    ambienceSongs: {},
    suggestions: [],
    greeting: {}
}

const api = async (uri, options = {}) => {
    return await fetch(uri, options).then(async(res) =>{
        var response = await res.json();
        return response;
    }).catch((rej)=> console.log(rej))
}

export const getQuickPicks = async (setMusicList) => {
    if(cache.quickPicks.length !== 0){ setMusicList(cache.quickPicks); return}
    let list = await api(randomPlaylists)
    cache.quickPicks = list['playListDetails']['mixcs5001eMeb-msk-mU51ky4'].musicList;
    setMusicList(cache.quickPicks);
};

export const getPLaylists = async (viewMode, listType, totalList=6, totalPerList=15, valueExact=false) => {
    if(cache.playLists[listType] !== undefined){ return cache.playLists[listType][`playList${viewMode}`] }
    cache.playLists[listType] = await api(`${musikyAPI_Base}/msk/random-content/playlists?totalList=${totalList}&totalPerList=${totalPerList}&listPrefix=${listType}&valueExact=${valueExact}`);
    return cache.playLists[listType][`playList${viewMode}`];
};

export const getSongsList = async (totalSong, listType) => {
    if(cache.ambienceSongs[listType] !== undefined){ return cache.ambienceSongs[listType] }
    cache.ambienceSongs[listType] = await api(`${musikyAPI_Base}/msk/random-content/songs?totalSong=${totalSong}&listType=${listType}`);
    return cache.ambienceSongs[listType];
};

export const getSuggestionArtists = async (total) => {
    if(cache.suggestions.length){ return cache.suggestions }
    cache.suggestions = await api(`${musikyAPI_Base}/msk/search/search-suggestions?total=${total}`);
    return cache.suggestions
};


export const completeInput = async (input, maxResult) => {
    let result = await api(`${musikyAPI_Base}/msk/search/auto-complete?input=${input}&maxResult=${maxResult}`);
    return result
};

export const getGreeting = async () => {
    if(Object.keys(cache.greeting).length){ return cache.greeting }
    cache.greeting = await api(`${musikyAPI_Base}/greeting`);
    return cache.greeting
};