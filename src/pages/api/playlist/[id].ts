import type { NextApiRequest, NextApiResponse } from 'next';
import cache from "memory-cache";
import { PlaylistProps } from 'common/types';
import byId from 'common/utils/playlists/byId';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlaylistProps>
) {
  const KEY = `playlist:${req.query.id}`;
  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  };

  const playlist = await byId({ id: String(req.query.id) });
  cache.put(KEY, playlist, 60 * 60000);
  res.status(200).json(playlist);
}
