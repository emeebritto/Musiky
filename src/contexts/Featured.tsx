import React, { useContext, createContext, useState, useEffect } from 'react';
import Styled from 'styled-components';
import {FeaturedContextData, Music } from 'common/types';
import dataStorage from 'common/storage';
import { usePlayer } from 'contexts/player';

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
  const { prop } = usePlayer();
	const $ = useContext(FeaturedContext);

  const audioStorekey = 'autoplay-msk-background-player';
  const videoStorekey = 'autoplay-msk-background--video-player';
	
// ==================================================================

  const preLoad = (id: string): void => {
    if (!prop.playing) {
      $.setAudId(id);
    }
  }

  const resumeAndPauseAudio = (): void => {
    console.log($.playingAud);
    console.log(typeof $.playingAud);
    dataStorage.set(audioStorekey, !$.playingAud);
    $.setPlayingAud((playingAud: boolean) => !playingAud);
  };
  const resumeAndPauseVideo = (): void => {
    dataStorage.set(videoStorekey, !$.playing);
    $.setPlaying((playing: boolean) => !playing);  
  };
  const stopVideo = () => {
    //$.setAudId('');
    $.setPlaying(false);
  }
  const stopSong = () => {
    //$.setAudId('');
    $.setPlayingAud(false);
  }
  const stopAll = () => {
    $.setPlayingAud(false);
    $.setPlaying(false);
    dataStorage.set(audioStorekey, false);
    dataStorage.set(videoStorekey, false);
  }

  useEffect(() => {
    // if some music is playing
    if (prop.playing) stopAll();
  },[prop.playing])

  useEffect(()=>{
    if (dataStorage.get(audioStorekey) != undefined
      && dataStorage.get(videoStorekey) != undefined) {
      $.setPlayingAud(dataStorage.get(audioStorekey));
      $.setPlaying(dataStorage.get(videoStorekey));      
    } else {
      dataStorage.set(audioStorekey, false);
      dataStorage.set(videoStorekey, true); 
    }

  },[])

  return {
    ...$,
    preLoad,
    resumeAndPauseAudio,
    resumeAndPauseVideo,
    stopSong,
    stopVideo,
    stopAll
  }
}
