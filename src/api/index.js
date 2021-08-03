const musikyAPI_Base = 'https://api-musiky.herokuapp.com'
const localVersion = 'http://localhost:8877'
const uri_Mixs = `${musikyAPI_Base}/mixsGenerator?totalPlayList=5&totalPerList=12`

const api = async (uri, options = {}) => {
    return await fetch(uri, options).then(async(res) =>{
        var response = await res.json();
        console.log(response);
        return response;
    }).catch((rej)=> console.log(rej))
}

var lastQuickPicks =[];
export const quickPicks = setMusicList => api(`${musikyAPI_Base}/RandomSongs?totalResult=10`)
    .then(response => {
        if(lastQuickPicks.length !== 0){ setMusicList(lastQuickPicks); return}
        lastQuickPicks = response;
        console.log(response);
        setMusicList(response);
});

var playLists ={};
export const getPLaylists = async (filter) => {
    if(Object.keys(playLists).length !== 0){return playLists[`${filter}`]}
    playLists = await api(uri_Mixs);
    return playLists.[`${filter}`];
};
