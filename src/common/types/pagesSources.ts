import { Music, PlaylistProps, ArtistDataProps } from 'common/types';

export interface ExploreContent {
    playlists: any;
    disks: Array<Music>;
}


export interface HomeContent {
    greeting: {
        greetingText: string;
        greetingImg: string;
    };
    quickPicks: {
        id: string;
        list: Array<Music>;
    };
    playlists: any;
    artists: Array<ArtistDataProps>;
}

export interface SearchPageContent {
	playlists: any;
	artists: Array<ArtistDataProps>;
	searchSuggestions: Array<string>;
}