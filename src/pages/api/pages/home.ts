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

  const $: HomeContent | {} = {};

  let playlists = await randomPlaylists({ totalList: 1 });
  let firstPlaylistId = playlists.items[0].id;

  $.greeting = greeting();
  $.recommendations = await recommendations();
  $.quickPicks = await randomPlaylists({ totalList: 10, category: 'random' });
  $.playlists.mixs = await randomPlaylists({ totalList: 6 }).then(r=>r.items);
  $.artists = await randomArtists({ maxResult: 6 }).then(r=>r.artists);
  $.playlists.otherMixs = await randomPlaylists({ totalList: 6 }).then(r=>r.items);
  $.playlists.justSongs = await randomPlaylists({ totalList: 6 }).then(r=>r.items);

  res.status(200).json($)
}
