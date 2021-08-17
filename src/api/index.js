const musikyAPI_Base = 'https://api-musiky.herokuapp.com'

const randomPlaylists = `${musikyAPI_Base}/randomPlaylists?totalList=1&totalPerList=10&valueExact=true`


const api = async (uri, options = {}) => {
    return await fetch(uri, options).then(async(res) =>{
        var response = await res.json();
        return response;
    }).catch((rej)=> console.log(rej))
}


var lastQuickPicks =[];
export const quickPicks = async (setMusicList) => {
    if(lastQuickPicks.length !== 0){ setMusicList(lastQuickPicks); return}
    let list = await api(randomPlaylists)
    lastQuickPicks = list['playListDetails']['mixcs5001eMeb-msk-mU51ky4'].musicList;
    setMusicList(lastQuickPicks);
};


var playLists ={};
export const getPLaylists = async (viewMode, listType, totalList=6, totalPerList=15, valueExact=false) => {
    if(playLists[listType] !== undefined){ return playLists[listType][`playList${viewMode}`] }
    playLists[listType] = await api(`${musikyAPI_Base}/randomPlaylists?totalList=${totalList}&totalPerList=${totalPerList}&listPrefix=${listType}&valueExact=${valueExact}`);
    return playLists[listType][`playList${viewMode}`];
};


var ambienceSongs ={};
export const getSongsList = async (totalSong, listType) => {
    if(ambienceSongs[listType] !== undefined){ return ambienceSongs[listType] }
    ambienceSongs[listType] = await api(`${musikyAPI_Base}/randomSongs?totalSong=${totalSong}&listType=${listType}`);
    return ambienceSongs[listType];
};


var suggestions =[]
export const getSuggestionArtists = async (total) => {
    if(suggestions.length){ return suggestions }
    suggestions = await api(`${musikyAPI_Base}/gSuggestions?total=${total}`);
    return suggestions
};


export const completeInput = async (input, maxResult) => {
    let result = await api(`${musikyAPI_Base}/auto-complete?input=${input}&maxResult=${maxResult}`);
    return result
};