import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import { ExploreContent } from 'common/types/pagesSources';
import randomPlaylists from 'common/utils/random/playlists';
import randomSongs from 'common/utils/random/songs';

const KEY = 'page:explore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreContent>
) {

  const cachedResponse = cache.get(KEY);
  if (cachedResponse) {
    res.status(200).json(cachedResponse);
    return;
  };

  const $: ExploreContent = {
    playlists: {
      exploreList: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      exploreNewSets: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      anotherSets: await randomPlaylists({ totalList: 6 }).then(r=>r.items)
    },
    disks: await randomSongs({ maxResult: 6 })
  };

  cache.put(KEY, $, 60 * 60000);
  res.status(200).json($);
}
