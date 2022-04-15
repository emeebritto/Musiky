import { Music, PlaylistProps, ArtistDataProps } from 'common/types';

export interface ExploreContent {
    playlists:any;
    disks: {
        id:string,
        list:Music[]
    };
}
export interface HomeContent {
    recommendations: {
        clip:Music;
        artist:ArtistDataProps;
        instrumental:Music;
    } | undefined;
    greeting: {
        greetingText:string;
        greetingImg:string;
    };
    quickPicks: {
        items:PlaylistProps[];
    };
    yourFlow: {
        emotions:Music[];
    }
    playlists:any;
    artists:ArtistDataProps[];
}
export interface SearchPageContent {
	playlists:any;
	artists:ArtistDataProps[];
	searchSuggestions:string[];
}

export interface WatchPageContent {
    media:Music;
}

export interface ArtistPageContent {
  artist:ArtistDataProps;
  musics:Music[];
  playlists:PlaylistProps[];
  requestId:string;
}