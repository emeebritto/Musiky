import React, { createContext, useState, useRef } from 'react';
import { PlayerContextData, Music } from 'common/types';
import {
	PlayerProgressProvider,
	PlayerFlowProvider
} from 'contexts/player';


interface LayoutProps {
	children: React.ReactNode;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);
PlayerContext.displayName = 'Player';

export const PlayerProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [music, setMusic] = useState<null | Music>(null);
	const [playing, setPlaying] = useState(false);
	const [syncedStartIn, setSyncedStartIn] = useState(false);
	const [mode, setMode] = useState<string[]>(['player:audio']);
	const [isLive, setIsLive] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [volume, setVolume] = useState(1);
	const [lastVolume, setLastVolume] = useState(0);
	const [loop, setLoop] = useState(false);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [buffer, setBuffer] = useState(false);
	const [muted, setMuted] = useState(false);
	const socket = useRef(null);
	const audPlayer = useRef(null);
	const watchPlayer = useRef(null);
	const watchPlayerWrapper = useRef(null);

	return (
		<PlayerProgressProvider>
			<PlayerFlowProvider>
				<PlayerContext.Provider value={{
					ref: {
						socket,
						audPlayer,
						watchPlayer,
						watchPlayerWrapper
					},
					music,
					setMusic,
					syncedStartIn,
					setSyncedStartIn,
					playing,
					setPlaying,
					mode,
					setMode,
					isLive,
					setIsLive,
					fullscreen,
					setFullscreen,
					volume,
					setVolume,
					lastVolume,
					setLastVolume,
					loop,
					setLoop,
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
			</PlayerFlowProvider>
		</PlayerProgressProvider>
	)
}