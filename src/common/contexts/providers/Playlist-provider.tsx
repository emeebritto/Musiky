import React, { createContext, useState, useRef } from 'react';
import { Music } from 'common/types';
import { PlaylistContextData, PlaylistProps } from 'common/types';


export const PlaylistContext = createContext<PlaylistContextData>({} as PlaylistContextData);
PlaylistContext.displayName = 'Playlist';

interface LayoutProps {
	children: React.ReactNode;
}

export const PlaylistProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [playingIndex, setPlayingIndex] = useState(0);
	const [playlist, setPlaylist] = useState<PlaylistProps | null>(null);
	const [playlistId, setPlaylistId] = useState('');
	const [musiclist, setMusiclist] = useState<Array<Music>>([]);
	const [playlistLoop, setPlaylistLoop] = useState(false);
	const [playListShuffle, setPlayListShuffle] = useState(false);
	const ended = useRef(null);

	return (
		<PlaylistContext.Provider value={{
			playingIndex,
			setPlayingIndex,
			playlist,
			setPlaylist,
			musiclist,
			setMusiclist,
			playlistId,
			setPlaylistId,
			playlistLoop,
			setPlaylistLoop,
			playListShuffle,
			setPlayListShuffle,
			on: {
				ended
			}
		}}>
			{ children }
		</PlaylistContext.Provider>
	)
}