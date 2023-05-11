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
	const query = String(req.query?.q || '');
	if (!query) return res.status(401).json({
		status: 401,
		message: "query is required"
	});
	return dSpot.search(query).then(r => {
  		res.status(200).json(r.data.data.searchV2);
		}).catch(e => {
			console.log({ err: e });
  		res.status(404).json(e.response.data);
		});
}
