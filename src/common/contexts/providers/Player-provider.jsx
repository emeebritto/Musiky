import React, { createContext, useState } from 'react';

export const PlayerContext = createContext();
PlayerContext.displayName = 'Player';

export default function PlayerProvider({ children }){
	
	const [music, setMusic] = useState(null);
	const [playing, setPlaying] = useState(true);
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
			ref: {
				playerRef
			},
			music,
			setMusic,
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