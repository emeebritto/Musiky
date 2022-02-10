import type { NextApiRequest, NextApiResponse } from 'next'
import faker from 'faker';
import { ArtistDataProps, PlaylistProps, Music } from 'common/types';
import artistData from 'common/utils/artists/artistData';

interface Response {
  requestId: string;
  query: string;
  artistData: ArtistDataProps | {};
  playlists: Array<PlaylistProps>;
  musics: Array<Music>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const infors = {
    requestId: faker.datatype.uuid(),
    query: String(req.query.q)
  };

  let data = await artistData({ q: String(req.query.q) });
  res.status(200).json({...data, ...infors});
}
