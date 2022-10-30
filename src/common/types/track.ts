import { Artist } from "common/types/artist";
import { Image } from "common/types/image";
import { Album } from "common/types/album";


export interface Track {
	added_at:string;
	added_by: {
		external_urls: {
			spotify:string;
		};
		href:string;
		id:string;
		type:string;
		uri:string;
	};
	is_local:boolean;
	primary_color:null|any;
	track: {
		album:Album;
		artists:Artist[];
		disc_number:number;
		duration_ms:number;
		episode:boolean;
		explicit:boolean;
		external_ids: {
			isrc:string;
		};
		external_urls: {
			spotify:string;
		};
		href:string;
		id:string;
		is_local:number;
		is_playable:boolean;
		name:string;
		popularity:number;
		preview_url:string;
		track:boolean;
		track_number:number;
		type:string;
		uri:string;
	};
	video_thumbnail: {
		url:null|string;
	};
}