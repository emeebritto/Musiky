import type { NextApiRequest, NextApiResponse } from 'next'
import faker from 'faker';
import { istatic } from 'services';
import { SearchReturn } from 'common/types';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchReturn>
) {

  const query = String(req.query?.q || '');

  const result:SearchReturn = {
    query: query,
    requestId: faker.datatype.uuid(),
    notFound: false,
    musics: []
  };

  if (!query) {
    result.notFound = true;
    return res.status(404).json(result);
  }

  const artists = await istatic
    .artistsData({ searchName: query })
    .then(r => r.data);

  if (!artists || !artists.length) {
    result.notFound = true;
    return res.status(404).json(result);
  }

  result.searchTop = artists[0];
  result.artists = artists;

  const musics = await istatic
    .musicsData({ filter: `artists:${artists[0].name}` })
    .then(r => r.data);
  if (musics) result.musics = musics;

  res.status(200).json(result);
}
