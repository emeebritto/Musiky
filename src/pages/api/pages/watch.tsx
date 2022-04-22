import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cache from "memory-cache";
import istatic from 'services/istatic';
import { Music } from 'common/types';

interface WatchContent {
  media:Music;
}

interface NotFoundContent {
  msg:string;
}

export default async function handler(
  req:NextApiRequest,
  res:NextApiResponse<WatchContent | NotFoundContent>
) {

  const KEY = `page:watch:${req.query.v}`;

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) return res.status(200).json(cachedResponse);

  const id = String(req.query?.v || '');
  if (!id) return res.status(404).json({ msg: `id is required!` });

  const $ = {
    media: await istatic.musicsData({ id }).then(r => r.data[0])
  };

  cache.put(KEY, $, 60 * 60000); // one hour total
  res.status(200).json($)
}
