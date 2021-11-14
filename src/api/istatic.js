const devENV = false;

const prodAPI = 'https://cdn-istatics.herokuapp.com/static/';
const devAPI = 'http://localhost:9872/static/';

const BaseUrl = devENV ? devAPI : prodAPI;


export const istatic = {
    iconPlay: ()=> `${BaseUrl}icons/play_arrow_black_24dp.svg`,
    icon_playing: ()=> `${BaseUrl}icons/AnimatedSvg/playing.svg`,
    iconBack: ()=> `${BaseUrl}icons/skip_previous_white_24dp.svg`,
    backPage: ()=> `${BaseUrl}icons/back_icon.svg`,
    iconRandom: ()=> `${BaseUrl}icons/shuffle_white_24dp.svg`,
    iconLoop: ()=> `${BaseUrl}icons/loop_white_24dp.svg`,
    iconShare: ()=> `${BaseUrl}icons/share_white_24dp.svg`,
    iconCommunity: () => `${BaseUrl}icons/groups_white_24dp.svg`,

    search_Icon: ()=> `${BaseUrl}icons/search_white_24dp.svg`,
    branding: ()=> `${BaseUrl}imgs/branding/branding_Musiky.png`,
    homeIcon: ()=> `${BaseUrl}icons/home_white_24dp.svg`,
    exploreIcon: ()=> `${BaseUrl}icons/explore_white_24dp.svg`,
    libraryIcon: ()=> `${BaseUrl}icons/video_library_white_24dp.svg`,

    upgradeIcon: ()=> `${BaseUrl}icons/trending_up_white_24dp.svg`,
    musicLoading: ()=> `${BaseUrl}icons/AnimatedSvg/loading.svg`,
    iconPause: ()=> `${BaseUrl}icons/pause_black_24dp.svg`,
    iconNext: ()=> `${BaseUrl}icons/skip_next_white_24dp.svg`,
    iconLyric: ()=> `${BaseUrl}icons/mic_external_on_white_24dp.svg`,

    iconRepeat: ()=> `${BaseUrl}icons/repeat_white_24dp.svg`,
    iconVolume: ()=> `${BaseUrl}icons/volume_up_white_24dp.svg`,
    iconVolumeDown: ()=> `${BaseUrl}icons/volume_down_white_24dp.svg`,
    iconVolumeOff: ()=> `${BaseUrl}icons/volume_off_white_24dp.svg`,

    city: ()=> `${BaseUrl}imgs/city.svg`,
    cellingLight: ()=> `${BaseUrl}imgs/cellingLight.png`
};
