import React, { createContext, useState } from 'react';
import { Music } from 'common/types';
import { PlaylistContextData } from 'common/types';


export const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);
PlaylistContext.displayName = 'Playlist';

interface LayoutProps {
	children: React.ReactNode;
}

export const PlaylistProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [playingIndex, setPlayingIndex] = useState(0);
	const [playlistId, setPlaylistId] = useState('');
	const [musiclist, setMusiclist] = useState<Array<Music>>([]);
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