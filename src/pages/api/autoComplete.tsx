import type { NextApiRequest, NextApiResponse } from 'next';
import { istatic } from 'services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[] | []>
) {

  const input = String(req.query?.input || '');
  const maxResult = parseInt(String(req.query?.maxResult)) || 8;
  if (input.length < 1) return res.status(200).json([]);

  const musicTitles:string[] = await istatic
    .musicsData({ onlyTitle: 1, searchTitle: input, maxResult: maxResult / 2 })
    .then(r => r.data.map(music => music.title));

  const artistsNames:string[] = await istatic
    .artistsData({ onlyNames: 1, searchName: input, maxResult: maxResult / 2 })
    .then(r => r.data.map(artist => artist.name));

  return res.status(200).json([ ...musicTitles, ...artistsNames ]);
}
