import type { NextApiRequest, NextApiResponse } from 'next'
import { musiky } from "services";
import * as usetube from "usetube";
// import axios from "axios";

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

	const searchResult = await usetube.searchVideo(query);
	if (!searchResult || !searchResult?.videos.length) {
		return res.status(404).json({ message: "sorry - not found" });
	}

	res.status(200).json({
		url: musiky.api.stream(searchResult.videos[0].id, { source: "yt" })
	});

	// return axios({
	// 	url: musiky.api.stream(searchResult.videos[0].id, { source: "yt" }),
	// 	method:'GET',
	// 	responseType: "stream"
	// }).then(r => r.data.pipe(res));
}
