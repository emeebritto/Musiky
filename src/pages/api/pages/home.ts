import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import { istatic } from 'services';
import { HomeContent } from 'common/types/pages';
import greeting from 'common/utils/greeting';
import recommendations from 'common/utils/recommendations';
import randomPlaylists from 'common/utils/random/playlists';

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

  // page content object
  const $ = {
    greeting: greeting(),
    recommendations: await recommendations(),
    quickPicks: await randomPlaylists({ totalList: 10, category: 'random' }),
    yourFlow: {
      emotions: await istatic.emotions({ random: 1, maxResult: 10 }).then(r=>r.data)
    },
    playlists: {
      mixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      otherMixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      justSongs: await randomPlaylists({ totalList: 6 }).then(r=>r.items)
    },
    artists: await istatic.artistsData({ random: 1, maxResult: 6 }).then(r => r.data)
  };
  
  // create playlists cache:
  let quickPicksPlaylists = $.quickPicks.items;
  for (let i=0; i < quickPicksPlaylists.length; i++) {
    let { id } = quickPicksPlaylists[i];
    cache.put(`playlist:${id}`, quickPicksPlaylists[i], 1440 * 60000);
  }

  cache.put(KEY, $, 60 * 60000); // one hour total
  res.status(200).json($)
}
