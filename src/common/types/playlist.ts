import { Track, Image } from "common/types";


export interface PlaylistSnippet {
	uri:string;
	name:string;
	description:string;
	owner: {
		name:string;
	};
	images: {
		items:any[];
	};
}

export interface Playlist {
	collaborative:boolean;
	description:string;
	followers: {
		total:number;
	};
	images:Image[];
	name:string;
	owner: {
		display_name:string;
		id:string;
		uri:string;
	};
	public:boolean;
	tracks: {
		href:string;
		items:Track[];
	};
	uri:string;
}