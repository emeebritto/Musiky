import { request } from 'common/utils/request';
import faker from 'faker';


const randomPlaylists = async(
    { totalList, category='all' }: 
    {totalList: number, category?: string}
) => {
    let playlists = {
        request: 'random-list',
        requestId: faker.datatype.uuid(),
        items: [],
        length: 0
    };
    let lists = await request(
        'allPlaylist',
        `?random=1&categoryInput=${category}&maxPlaylists=${totalList}`
    );
    playlists.items = lists.items;
    playlists.length = lists.itemsLength;
    return playlists;
}

export default randomPlaylists;
