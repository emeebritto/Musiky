import type { NextApiRequest, NextApiResponse } from 'next'
import { musiky } from "services";
import axios from "axios";

interface NotFound {
	status:number;
	message:string;
}

async function searchImages(term:string):Promise<any[]> {
	return axios.get(`https://search.neblika.com/api/search?q=${term}&ai=false&keywords=&type=IMAGE`)
		.then(r => r.data.images);
}

async function searchMedia(term:string):Promise<any[]> {
	return axios.get(`https://emee-proxy.hf.space/get-yt-results?q=${term}&limit=1&provider=url-stream`)
		.then(r => r.data);
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

	const searchResult = await searchMedia(query);
	if (!searchResult || !searchResult.length) {
		return res.status(404).json({ message: "sorry - not found" });
	}

	const video = searchResult[0];
	const images = await searchImages(video.channel.name || video.title.replace(/\W/g, " "));
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.status(200).json({
		...(video || {}),
		cover: images[~~(Math.random() * images.length)] || {},
		url: musiky.api.stream(video.id, { source: "yt" })
	});

	// return axios({
	// 	url: musiky.api.stream(video.id, { source: "yt" }),
	// 	method:'GET',
	// 	responseType: "stream"
	// }).then(r => r.data.pipe(res));
}
