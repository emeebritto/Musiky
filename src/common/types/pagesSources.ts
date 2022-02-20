import { Music, PlaylistProps, ArtistDataProps } from 'common/types';

export interface ExploreContent {
    playlists: any;
    disks: Array<Music>;
}

export interface HomeContent {
    recommendations: {
        clip: Music;
        artist: ArtistDataProps;
        instrumental: Music;
    } | undefined;
    greeting: {
        greetingText: string;
        greetingImg: string;
    };
    quickPicks: {
        items: Array<PlaylistProps>;
    };
    yourFlow: {
        emotions: Music[];
    }
    playlists: any;
    artists: Array<ArtistDataProps>;
}

export interface SearchPageContent {
	playlists: any;
	artists: Array<ArtistDataProps>;
	searchSuggestions: Array<string>;
}