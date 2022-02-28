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

  const id = req.query.id;

  const wasCache = id.split('-')[0] === 'qp' || id.split('-')[0] === 'last';
  if (wasCache) {
    res.status(200).send();
    return;
  }

  const playlist = await byId({ id: String(id) });
  cache.put(KEY, playlist, 60 * 60000);
  res.status(200).json(playlist);
}
