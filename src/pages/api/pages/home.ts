import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import cache from "memory-cache";
import { IstaticBaseUrl } from 'services';
import { HomeContent } from 'common/types/pagesSources';
import greeting from 'common/utils/greeting';
import recommendations from 'common/utils/recommendations';
import randomPlaylists from 'common/utils/random/playlists';
import randomArtists from 'common/utils/random/artists';

const KEY = 'page:home';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeContent>
) {

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  }

  const $ = {
    greeting: greeting(),
    recommendations: await recommendations(),
    quickPicks: await randomPlaylists({ totalList: 10, category: 'random' }),
    yourFlow: {
      emotions: await axios.get(`${IstaticBaseUrl}emotions?random=1&maxResult=10`).then(r=>r.data)
    },
    playlists: {
      mixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      otherMixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      justSongs: await randomPlaylists({ totalList: 6 }).then(r=>r.items)
    },
    artists: await randomArtists({ maxResult: 6 }).then(r=>r.artists)
  };
  // create playlists cache:
  let quickPicksPlaylists = $.quickPicks.items;
  for (let i=0; i < quickPicksPlaylists.length; i++) {
    let { id } = quickPicksPlaylists[i];
    cache.put(`playlist:${id}`, quickPicksPlaylists[i], 1440 * 60000);
  }

  cache.put(KEY, $, 60 * 60000);
  res.status(200).json($)
}
