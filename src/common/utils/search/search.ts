import faker from 'faker';
import { request } from 'common/utils/request';


const search = async({ input }: {input: string}) => {

    let res = {
        input: input,
        provider: 'istatics',
        requestId: faker.datatype.uuid(),
        noFound: false,
        searchTop: null,
        artists: [],
        musics: []
    };

	const { items=null } = await request('artist', `${input}?type=name`);

    if(items && items.length){
        res.searchTop = items[0];
        res.artists = items;

        let resAPi = await request('allMusics', `?withArtist=${items[0].name.replace(/\W|_/g, '')}&maxResult=9999`);

        res.musics = resAPi.items;
    } else {
        res.noFound = true;
    }

    return res
}

export default search;