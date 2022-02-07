import { request } from 'common/utils/request';

const byId = async({ id }: {id: string}) => {
    let res = await request('playlistById', `?id=${id}`);
    return res;
}

export default byId;
