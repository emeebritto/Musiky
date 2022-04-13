import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cache from "memory-cache";
import istatic from 'services/istatic';
import { Music } from 'common/types';

interface WatchContent {
  media: Music;
}

interface NotFoundContent {
  msg: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WatchContent | NotFoundContent>
) {

  const KEY = `page:watch:${req.query.v}`;

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  }

  const id = req.query?.v || null;

  if (!id) {
    res.status(404).json({ msg: `not found (${id})` });
    return;
  }

  const $ = {
    media: await istatic.musicData({ id: String(id) }).then(r => r.data)
  };

  cache.put(KEY, $, 60 * 60000); // one hour total
  res.status(200).json($)
}
