import type { NextApiRequest, NextApiResponse } from 'next';
import faker from 'faker';
import { ArtistDataProps, PlaylistProps, Music } from 'common/types';
import { istatic } from 'services';

interface Response {
  requestId:string;
  query:string;
  artist:ArtistDataProps | {};
  playlists:PlaylistProps[];
  musics:Music[];
};

interface NotFound {
  msg:string;
}

export default async function handler(
  req:NextApiRequest,
  res:NextApiResponse<Response | NotFound>
) {

  const query = String(req.query?.q || '');

  if (!query) {
    return res.status(404).json({ msg: `artist not found (empty query)` })
  }

  const infors = {
    requestId: faker.datatype.uuid(),
    query: query
  };

  const artist = await istatic
    .artistsData({ searchName: query })
    .then(r => r.data[0]);

  const musics = await istatic
    .musicsData({ filter: `artists:${query}` })
    .then(r => r.data);

  const list = await istatic.allPlaylists({ withArtist: query }).then(r => r.data);
  const playlists = list.items;

  res.status(200).json({ ...infors, artist: artist || {}, playlists, musics });
}
