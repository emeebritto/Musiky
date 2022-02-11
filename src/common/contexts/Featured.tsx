import React, { useContext, createContext, useState, useEffect } from 'react';
import Styled from 'styled-components';
import {FeaturedContextData, Music } from 'common/types';
import { usePlayerContext } from 'common/contexts/Player';

const ViewPort = Styled.section` 
  position: relative;
  background-color: #020309;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

interface LayoutProps {
  children: React.ReactNode;
}
export const FeaturedContext = createContext<FeaturedContextData>({} as FeaturedContextData);
FeaturedContext.displayName = 'FeaturedContent';

export const FeaturedProvider: React.FC<LayoutProps> = ({ children }) => {
  // Video:
  const [playing, setPlaying] = useState(true);
  // Audio:
  const [playingAud, setPlayingAud] = useState(true);
  const [AudId, setAudId] = useState('');
  const [AudVol, setAudVol] = useState(0.5);

  return (
    <FeaturedContext.Provider value={{
      playing,
      setPlaying,
      AudId,
      setAudId,
      playingAud,
      setPlayingAud,
      AudVol,
      setAudVol
    }}>
      <ViewPort>
        { children }
      </ViewPort>
    </FeaturedContext.Provider>
  )
}


// ==================================================================

export function useFeaturedContext(){
  const { prop } = usePlayerContext();
	const $ = useContext(FeaturedContext);
	
// ==================================================================

  const playSong = (id: string): void => {
    if (!prop.playing) {
      $.setAudId(id);
      $.setPlayingAud(true);      
    }
  }

  const stopSong = () => {
    $.setAudId('');
    $.setPlayingAud(false);
  }

  const stopAll = () => {
    $.setPlayingAud(false);
    $.setPlaying(false);
  }

  useEffect(() => {
    if (prop.playing) stopAll();
  },[prop.playing])

  return { ...$, playSong, stopAll }
}
