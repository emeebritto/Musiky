import type { NextApiRequest, NextApiResponse } from 'next'
import { PlaylistProps } from 'common/types';
import byId from 'common/utils/playlists/byId';
 

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlaylistProps>
) {
  const playlist = await byId({ id: String(req.query.id) });
  res.status(200).json(playlist);
}
