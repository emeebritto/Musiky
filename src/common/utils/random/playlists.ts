import { istatic } from 'services';
import { PlaylistProps } from 'common/types';
import faker from 'faker';

interface ReturnObj {
    request:string;
    requestId:string;
    items:PlaylistProps[] | [];
}

const randomPlaylists = async(
    { totalList, category='all' }: 
    {totalList: number, category?: string}
) => {
    let playlists: ReturnObj = {
        request: 'random-list',
        requestId: faker.datatype.uuid(),
        items: []
    };

    let lists = await istatic.allPlaylists({
        random: 1,
        categoryInput: category,
        musicsType: 'tags:music',
        maxPlaylists: totalList
    }).then(r => r.data);

    playlists.items = lists.items;
    return playlists;
}

export default randomPlaylists;
