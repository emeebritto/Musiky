import type { NextApiRequest, NextApiResponse } from 'next'
import { ExploreContent } from 'common/types/pagesSources';
import randomPlaylists from 'common/utils/random/playlists';
import randomSongs from 'common/utils/random/songs';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreContent>
) {

  const $ = {};
  $.playlists = {};

  $.playlists.exploreList = await randomPlaylists({ totalList: 6 })
    .then(r=>r.items);
  $.disks = await randomSongs({ maxResult: 6, listType: 'ambienceSongs' });
  $.playlists.exploreNewSets = await randomPlaylists({ totalList: 6 })
    .then(r=>r.items);
  $.playlists.anotherSets = await randomPlaylists({ totalList: 6 })
    .then(r=>r.items);

  res.status(200).json($)
}
