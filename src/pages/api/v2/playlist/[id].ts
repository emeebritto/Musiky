import type { NextApiRequest, NextApiResponse } from 'next'
import { dSpot } from "services";
// import { ArtistResult } from "common/types";

interface NotFound {
	status:number;
	message:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any|NotFound>
) {
	const id = String(req.query?.id || '');
	if (!id) return res.status(401).json({
		status: 401,
		message: "id is required"
	});
	return dSpot.playlist(id).then(r => {
  		res.status(200).json(r.data);
		}).catch(e => {
			console.log({ err: e });
  		res.status(404).json(e.response.data);
		});
}
