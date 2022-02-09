import faker from 'faker';
import { request } from 'common/utils/request';
import { ArtistDataProps } from 'common/types';


interface ArtistPerIndex {
    index: number;
    provider: string;
    resquestId: string;
    indexContent: ArtistDataProps;
};

interface FinalRes {
    maxResult: number,
    provider: string,
    resquestId: string,
    artists: ArtistDataProps[]
}

const randomArtists = async({ maxResult=6 }: {maxResult: number}) => {

    const res: FinalRes = {
        maxResult: maxResult,
        provider: 'Musiky API',
        resquestId: faker.datatype.uuid(),
        artists: []
    };

    while (res.artists.length < maxResult) {
        const randomNum: number = ~~(Math.random() * 200);
        let requestRes: ArtistPerIndex | undefined = await request(
            'artistPerIndex',
            `?index=${randomNum}`
        );
        if (requestRes && !!Object.keys(requestRes.indexContent).length) {
            res.artists.push(requestRes.indexContent);
        }
    }

    return res;
}

export default randomArtists;
