import React, { createContext, useState } from 'react';
import { LyricContextData, Music } from 'common/types';


interface LayoutProps {
	children: React.ReactNode;
}

export const LyricContext = createContext<LyricContextData>({} as LyricContextData);
LyricContext.displayName = 'Lyric';

export const LyricProvider: React.FC<LayoutProps> = ({ children }) => {
	
    const [Lyric, setLyric] = useState({});
    const [currentLine, setCurrentLine] = useState('waiting for the best moment..');
    const [showLyrics, setShowLyrics] = useState(false);

	return (
		<LyricContext.Provider value={{
			Lyric,
			setLyric,
			currentLine,
			setCurrentLine,
			showLyrics,
			setShowLyrics
		}}>
			{ children }
		</LyricContext.Provider>
	)
}