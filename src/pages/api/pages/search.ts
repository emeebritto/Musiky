import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import { SearchPageContent } from 'common/types/pagesSources';
import suggestions from 'common/utils/search/suggestions';
import randomPlaylists from 'common/utils/random/playlists';
import randomArtists from 'common/utils/random/artists';

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
    artists: await randomArtists({ maxResult: 6 })
      .then(r=>r.artists)
  }

  cache.put(KEY, $, 60 * 60000);
  res.status(200).json($);
}
