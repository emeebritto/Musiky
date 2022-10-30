import type { NextApiRequest, NextApiResponse } from 'next'
import { dSpot } from "services";
import { Playlist } from "common/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
	const result = await dSpot.getAlbumMetadata("1NmhmrcrG143ODfGk9myHE")
		.then(r => r.data)
		.catch(e => e.response?.data);

	// const artist = await dSpot.artist("spotify:artist:7okSU80WTrn4LXlyXYbX3P")
	// 	.then(r => r.data)
	// 	.catch(e => console.log(e.response.data));

	// console.log(artist);

  res.status(200).json(result);
}
