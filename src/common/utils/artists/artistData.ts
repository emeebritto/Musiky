import { request } from 'common/utils/request';

const artistData = async({ q }: {q: string}) => {

    const { items=null } = await request(
        'artist',
        `${q}?type=name`
    );

    const artist = items.length? items[0] : {};
    const resAPi = await request('allMusics', `?withArtist=${q}&maxResult=9999`);
    const musics = resAPi.items;
    const list = await request('allPlaylist', `?withArtist=${q}`);
    const playlists = list.items;

    return {
        artist,
        playlists,
        musics
    };
}

export default artistData;
