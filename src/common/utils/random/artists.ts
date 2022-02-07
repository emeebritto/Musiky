import faker from 'faker';
import { request } from 'common/utils/request';


const randomArtists = async({ maxResult=6 }: {maxResult: number}) => {

    let res = {
        maxResult: maxResult,
        provider: 'Musiky API',
        resquestId: faker.datatype.uuid(),
        artists: []
    };

    while(res.artists.length < parseInt(maxResult)){
        let randomNum = ~~(Math.random() * 200);
        let { indexContent } = await request(
            'artistPerIndex',
            `?index=${randomNum}`
        );
        res.artists.push(indexContent);
    }

    return res;
}

export default randomArtists;