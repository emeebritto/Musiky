import type { NextApiRequest, NextApiResponse } from 'next'
import { SearchPageContent } from 'common/types/pagesSources';
import suggestions from 'common/utils/search/suggestions';
import randomPlaylists from 'common/utils/random/playlists';
import randomArtists from 'common/utils/random/artists';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchPageContent>
) {

    const $ = {};
    $.playlists = {};

    $.searchSuggestions = await suggestions({ total: 11 });
    $.playlists.othersLists = await randomPlaylists({ totalList: 6 })
      .then(r=>r.items);
    $.artists = await randomArtists({ maxResult: 6 })
      .then(r=>r.artists);

  res.status(200).json($)
}
