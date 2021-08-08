const musikyAPI_Base = 'https://api-musiky.herokuapp.com'

const randomSongs = `${musikyAPI_Base}/randomSongs?totalList=1&totalPerList=10&valueExact=true`
const uri_Mixs = `${musikyAPI_Base}/randomSongs?totalList=5&totalPerList=12&valueExact=false`


const api = async (uri, options = {}) => {
    return await fetch(uri, options).then(async(res) =>{
        var response = await res.json();
        console.log(response);
        return response;
    }).catch((rej)=> console.log(rej))
}

var lastQuickPicks =[];
export const quickPicks = async (setMusicList) => {
    if(lastQuickPicks.length !== 0){ setMusicList(lastQuickPicks); return}
    let list = await api(randomSongs)
    lastQuickPicks = list['playListDetails'].mix1msk.musicList;
    setMusicList(lastQuickPicks);
};

var playLists ={};
export const getPLaylists = async (filter) => {
    if(Object.keys(playLists).length !== 0){return playLists[`${filter}`]}
    playLists = await api(uri_Mixs);
    return playLists[`${filter}`];
};
