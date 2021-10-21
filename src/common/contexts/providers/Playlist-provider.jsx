import { createContext, useState } from 'react';

const PlaylistContext = createContext()
PlaylistContext.displayName = 'Playlist'

export default function PlaylistProvider({ children }){
	
	const [playingIndex, setPlayingIndex] = useState(0);
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