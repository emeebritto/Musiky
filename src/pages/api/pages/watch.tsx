import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cache from "memory-cache";
import { IstaticBaseUrl } from 'api';
import { Music } from 'common/types';

interface WatchContent {
  media: Music;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<WatchContent>
) {

  const KEY = `page:watch:${req.query.v}`;

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  }

  const $ = {
    media: await axios.get(`${IstaticBaseUrl}music/${req.query.v}`).then(r => r.data)
  };

  cache.put(KEY, $, 60 * 60000);
  res.status(200).json($)
}
