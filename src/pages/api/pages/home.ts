import type { NextApiRequest, NextApiResponse } from 'next'
import { HomeContent } from 'common/types/pagesSources';
import greeting from 'common/utils/greeting';
import recommendations from 'common/utils/recommendations';
import randomPlaylists from 'common/utils/random/playlists';
import randomArtists from 'common/utils/random/artists';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeContent>
) {

  const $ = {
    greeting: greeting(),
    recommendations: await recommendations(),
    quickPicks: await randomPlaylists({ totalList: 10, category: 'random' }),
    playlists: {
      mixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      otherMixs: await randomPlaylists({ totalList: 6 }).then(r=>r.items),
      justSongs: await randomPlaylists({ totalList: 6 }).then(r=>r.items)
    },
    artists: await randomArtists({ maxResult: 6 }).then(r=>r.artists)
  };

  res.status(200).json($)
}