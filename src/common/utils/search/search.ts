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

	const artists = await request('artist', `${input}?type=name`);

    if(artists && artists.length){
        res.searchTop = artists[0];
        res.artists = artists;

        let resAPi = await request('allMusics', `?withArtist=${artists[0].name.replace(/\W|_/g, '')}&maxResult=9999`);

        res.musics = resAPi.items;
    } else {
        res.noFound = true;
    }

    return res
}

export default search;