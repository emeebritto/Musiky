import { Artist, Image } from "common/types";


export interface Album {
	album_type:string;
	artists:Artist[];
	external_urls: {
		spotify:string;
	};
	href:string;
	id:string;
	images:Image[];
	name:string;
	release_date:string;
	release_date_precision:string;
	total_tracks:number;
	type:string;
	uri:string;
}