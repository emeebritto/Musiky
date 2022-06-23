import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import { istatic } from 'services';
import { SearchPageContent } from 'common/types/pages';
import suggestions from 'common/utils/search/suggestions';
import randomPlaylists from 'common/utils/random/playlists';
import { oneHour } from "consts";

const KEY = 'page:search';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchPageContent>
) {

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  };

  const $ = {
    searchSuggestions: await suggestions({ total: 11 }),
    playlists: {
      othersLists: await randomPlaylists({ totalList: 6 })
        .then(r=>r.items)
    },
    artists: await istatic.artistsData({ random: 1, maxResult: 6 }).then(r => r.data)
  }

  cache.put(KEY, $, oneHour);
  res.status(200).json($);
}
