import { createContext, useState } from 'react';

const PlayerContext = createContext()
PlayerContext.displayName = 'Player'

export default function PlayerProvider({ children }){
	
	const [musicId, setMusicId] = useState(null);
	const [playing, setPlaying] = useState(false);
	const [volume, setVolume] = useState(1);
	const [lastVolume, setLastVolume] = useState(0);
	const [showLyrics, setShowLyrics] = useState(false);
	const [loop, setLoop] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(0);
	const [buffer, setBuffer] = useState(false);
	const [muted, setMuted] = useState(false);

	var playerRef = null;

	return (
		<PlayerContext.Provider value={{
			playerRef,
			musicId,
			setMusicId,
			playing,
			setPlaying,
			volume,
			setVolume,
			lastVolume,
			setLastVolume,
			showLyrics,
			setShowLyrics,
			loop,
			setLoop,
			currentTime,
			setCurrentTime,
			duration,
			setDuration,
			seeking,
			setSeeking,
			buffer,
			setBuffer,
			muted,
			setMuted
		}}>
			{ children }
		</PlayerContext.Provider>
	)
}