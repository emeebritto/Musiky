import React, { useContext, createContext, useState, useEffect } from 'react';
import Styled from 'styled-components';
import {FeaturedContextData, Music } from 'common/types';
import { DataStorage } from 'common/storage';
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
  const [playingAud, setPlayingAud] = useState(false);
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

  const preLoad = (id: string): void => {
    if (!prop.playing) {
      $.setAudId(id);
    }
  }

  const resumeAndPauseAudio = (): void => {
    $.setPlayingAud((playingAud: boolean) => !playingAud);
    DataStorage.set('autoplay-msk-background-player', !$.playingAud);
  };
  const resumeAndPauseVideo = (): void => {
    $.setPlaying((playing: boolean) => !playing);
    DataStorage.set('autoplay-msk-background--video-player', !$.playing);
  };

  const stopSong = () => {
    //$.setAudId('');
    $.setPlayingAud(false);
  }

  const stopAll = () => {
    $.setPlayingAud(false);
    $.setPlaying(false);
    DataStorage.set('autoplay-msk-background-player', false);
    DataStorage.set('autoplay-msk-background--video-player', false);
  }

  useEffect(() => {
    // if some music is playing
    if (prop.playing) stopAll();
  },[prop.playing])

  useEffect(()=>{
    const audioStorekey = 'autoplay-msk-background-player';
    const videoStorekey = 'autoplay-msk-background--video-player';
    if (DataStorage.get(audioStorekey) != undefined
      && DataStorage.get(videoStorekey) != undefined) {
      $.setPlayingAud(DataStorage.get(audioStorekey));
      $.setPlaying(DataStorage.get(videoStorekey));      
    } else {
      DataStorage.set(audioStorekey, false);
      DataStorage.set(videoStorekey, true); 
    }

  },[])

  return {
    ...$,
    preLoad,
    resumeAndPauseAudio,
    resumeAndPauseVideo,
    stopSong,
    stopAll
  }
}
