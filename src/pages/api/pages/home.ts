import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import { istatic } from 'services';
import { HomeContent } from 'common/types/pages';
import greeting from 'common/utils/greeting';
import recommendations from 'common/utils/recommendations';
import randomPlaylists from 'common/utils/random/playlists';
import { oneHour, twoHour } from "consts";

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
      mixs: await randomPlaylists({ totalList: 7 }).then(r=>r.items),
      otherMixs: await randomPlaylists({ totalList: 7 }).then(r=>r.items),
      justSongs: await randomPlaylists({ totalList: 7 }).then(r=>r.items)
    },
    artists: await istatic.artistsData({ random: 1, maxResult: 7 }).then(r => r.data)
  };
  
  // create playlists cache:
  let quickPicksPlaylists = $.quickPicks.items;
  for (let i=0; i < quickPicksPlaylists.length; i++) {
    let { id } = quickPicksPlaylists[i];
    cache.put(`playlist:${id}`, quickPicksPlaylists[i], twoHour);
  }

  cache.put(KEY, $, oneHour);
  res.status(200).json($)
}
