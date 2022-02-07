import faker from 'faker';
import { request } from 'common/utils/request';


const artistData = async({ q }: {q: string}) => {

    let idsString = '';
    let res = {
        requestId: faker.datatype.uuid(),
        query: q,
        artistData: {},
        playlists: [],
        musics: []
    };

    const { items=null } = await request(
        'artist',
        `${q}?type=name`
    );
    if(items.length){
        res.artistData = items[0];
        let resAPi = await request('allMusics', `?withArtist=${q}&maxResult=9999`);
        res.musics = resAPi.items;
    }

    let list = await request('allPlaylist', `?withArtist=${q}`);
    res.playlists = list.items;

    return res;
}

export default artistData;
