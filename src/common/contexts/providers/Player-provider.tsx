import React, { createContext, useState } from 'react';


export interface PlayerContextData {
	ref: {
		playerRef: any;
	};
	music: { id: string; } | null;
	setMusic: (s: {} | null) => void;
	playing: boolean;
	setPlaying: (s: boolean | ((s: boolean) => boolean)) => void;
	volume: number;
	setVolume: (s: number) => void;
	lastVolume: number;
	setLastVolume: (s: number) => void;
	showLyrics: boolean;
	setShowLyrics: (s: boolean | ((s: boolean) => boolean)) => void;
	loop: boolean;
	setLoop: (s: boolean | ((s: boolean) => boolean)) => void;
	currentTime: number;
	setCurrentTime: (s: number) => void;
	duration: number;
	setDuration: (s: number) => void;
	seeking : boolean;
	setSeeking: (s: boolean) => void;
	buffer: boolean;
	setBuffer: (s: boolean) => void;
	muted: boolean;
	setMuted: (s: boolean) => void;
}

interface LayoutProps {
	children: React.ReactNode;
}


export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);
PlayerContext.displayName = 'Player';

export const PlayerProvider: React.FC<LayoutProps> = ({ children }) => {
	
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