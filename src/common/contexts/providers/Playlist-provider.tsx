import React, { createContext, useState } from 'react';


export interface PlaylistContextData {
	playingIndex: number;
	setPlayingIndex: (s: number) => void;
	musiclist: Array<{}>;
	setMusiclist: (s: Array<{}>) => void;
	playlistId: string;
	setPlaylistId: (s: string) => void;
	playlistLoop: boolean;
	setPlaylistLoop: (s: boolean | (s: boolean) => boolean) => void;
	playListShuffle: boolean;
	setPlayListShuffle: (s: boolean | (s: boolean) => boolean) => void;
}


export const PlaylistContext = createContext<PlaylistContextData>()
PlaylistContext.displayName = 'Playlist'

export default function PlaylistProvider({ children }){
	
	const [playingIndex, setPlayingIndex] = useState(null);
	const [playlistId, setPlaylistId] = useState('');
	const [musiclist, setMusiclist] = useState('');
	const [playlistLoop, setPlaylistLoop] = useState(false);
	const [playListShuffle, setPlayListShuffle] = useState(false);


	return (
		<PlaylistContext.Provider value={{
			playingIndex,
			setPlayingIndex,
			musiclist,
			setMusiclist,
			playlistId,
			setPlaylistId,
			playlistLoop,
			setPlaylistLoop,
			playListShuffle,
			setPlayListShuffle
		}}>
			{ children }
		</PlaylistContext.Provider>
	)
}