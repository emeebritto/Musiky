import axios from 'axios';

interface PathProps {
  [key: string]: string;
}

const BASE_URL = process.env.NODE_ENV === 'development'
    ? `http://localhost:${9872}/`
    : 'https://cdn-istatics.herokuapp.com/'


const onError = (err: any) => {
    console.error(err);
}

const request = (
    pathName: string,
    params: string ='',
    callbackError=onError
) => {

    const paths: PathProps = {
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