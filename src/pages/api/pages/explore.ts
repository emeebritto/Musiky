import type { NextApiRequest, NextApiResponse } from 'next'
import cache from "memory-cache";
import faker from 'faker';
import { istatic } from 'services';
import { ExploreContent } from 'common/types/pages';
import randomPlaylists from 'common/utils/random/playlists';

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
    disks: await istatic.musicsData({
      random: 1,
      maxResult: 6,
      filter: 'tags:music'
    }).then(r => ({ id: faker.datatype.uuid(), list: r.data }))
  };

  cache.put(KEY, $, 60 * 60000);
  res.status(200).json($);
}
