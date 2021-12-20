import React, { createContext, useState } from 'react';
import { PlayerContextData, Music } from 'common/types';


interface LayoutProps {
	children: React.ReactNode;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);
PlayerContext.displayName = 'Player';

export const PlayerProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [music, setMusic] = useState<null | Music>(null);
	const [playing, setPlaying] = useState(true);
	const [volume, setVolume] = useState(1);
	const [lastVolume, setLastVolume] = useState(0);
	const [showLyrics, setShowLyrics] = useState(false);
	const [loop, setLoop] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(false);
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
	        currentTimeSeconds,
	        setCurrentTimeSeconds,
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