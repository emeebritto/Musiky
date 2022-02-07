import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const onError = err => {
    console.error(err);
}

const request = (pathName, params='', callbackError=onError) => {

    let paths = {
        playlist: 'playlist/',
        artist: 'artist/',
        allMusics: 'music/all',
        allPlaylist: 'playlist/all',
        playlistById: 'playlist/byId',
        artistPerPage: 'artist/getAllArtistsPerPage',
        artistPerIndex: 'artist/getByIndex',
        allArtistNames: 'artist/allNames'
    }

    let PATH = paths[pathName] ? paths[pathName] : pathName;
    let URL = `${BASE_URL + PATH + params}`;

    return axios.get(URL)
        .then(res => res.data)
        .catch(err => callbackError(err))
}

export { BASE_URL, request }