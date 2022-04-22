import React, { createContext, useState } from 'react';

interface PlayerProgressProp {
  currentTime: number;
  setCurrentTime: (s: number) => void;
  currentTimeSec: number;
  setCurrentTimeSec: (s: number) => void;
};

interface LayoutProps {
	children: React.ReactNode;
}

export const PlayerProgressContext = createContext<PlayerProgressProp>({} as PlayerProgressProp);
PlayerProgressContext.displayName = 'PlayerProgress';

export const PlayerProgressProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeSec, setCurrentTimeSec] = useState(0);

	return (
		<PlayerProgressContext.Provider value={{
			currentTime,
			setCurrentTime,
      currentTimeSec,
      setCurrentTimeSec
		}}>
			{ children }
		</PlayerProgressContext.Provider>
	)
}