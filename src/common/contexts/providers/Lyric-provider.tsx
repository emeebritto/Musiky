import React, { createContext, useState } from 'react';
import { LyricContextData, Music } from 'common/types';


interface LayoutProps {
	children: React.ReactNode;
}

export const LyricContext = createContext<LyricContextData>({} as LyricContextData);
LyricContext.displayName = 'Lyric';

export const LyricProvider: React.FC<LayoutProps> = ({ children }) => {
	
    const [lyric, setLyric] = useState({});
    const [currentLine, setCurrentLine] = useState('waiting for the best moment..');
    const [showLyrics, setShowLyrics] = useState(false);
    const [hasLyric, setHasLyric] = useState(false);

	return (
		<LyricContext.Provider value={{
			lyric,
			setLyric,
			currentLine,
			setCurrentLine,
			showLyrics,
			setShowLyrics,
	        hasLyric,
	        setHasLyric
		}}>
			{ children }
		</LyricContext.Provider>
	)
}