import { request } from 'common/utils/request';


const getArtistsPerPage = async({ page }: {page: number}) => {

    let { items } = await request('artistPerPage', `?page=${page}`);

    return items;
}

export default getArtistsPerPage;
