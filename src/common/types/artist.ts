import { PlaylistSnippet } from "common/types";

export interface Link {
	name:string;
	url:string;
}

export interface Profile {
	name:string;
	verified:boolean;
	pinnedItem:null|any;
	biography: {
		text:string;
	};
	externalLinks: {
		items:Link[];
	};
	playlists: {
		totalCount:number;
		items:PlaylistSnippet[];
	};
}

export interface Artist {
	external_urls: {
		spotify:string;
	};
	href:string;
	id:string;
	type:string;
	uri:string;
}

export interface ArtistResult {
	id:string;
	uri:string;
	following:boolean;
	sharingInfor: {
		shareUrl:string;
		shareId:string;
	};
	profile:Profile;
	visuals:any;
	discography:any;
	stats: {
		followers:number;
		monthlyListeners:number;
		worldRank:number;
		topCities: {
			items:any[];
		};
	};
	relatedContent: {
		appearsOn: {
			totalCount:number;
			items:any[];
		};
		featuring: {
			totalCount:number;
			items:any[];
		};
		discoveredOn: {
			totalCount:number;
			items:any[];
		};
		relatedArtists: {
			totalCount:number;
			items:any[];
		};
	};
}
