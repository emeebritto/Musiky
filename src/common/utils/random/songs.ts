import { request } from 'common/utils/request';


const randomSongs = async(
    {listType, maxResult=6 }:
    {listType: string, maxResult: number}
) => {
    let { items } = await request(
        'allMusics',
        `?maxResult=${maxResult}&categoryInput=${listType}`
    );
    return items;
}

export default randomSongs;