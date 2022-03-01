import { request } from 'common/utils/request';

const randomSongs = async({
  maxResult=6
}:{
  maxResult: number
}) => {
  let { requestId, items } = await request(
    'allMusics',
    `?random=1&maxResult=${maxResult}&categoryInput=${'tags:music'}`
  );

  return {
    id: requestId,
    list: items
  };
}

export default randomSongs;
