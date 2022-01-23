import React, { useContext, createContext, useState } from 'react';
import Styled from 'styled-components';
import { BackPlayerContextData, Music } from 'common/types';


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

export const BackPlayerContext = createContext<BackPlayerContextData>({} as BackPlayerContextData);
BackPlayerContext.displayName = 'BackPlayer';

export const BackPlayerProvider: React.FC<LayoutProps> = ({ children }) => {
    
    const [id, setId] = useState('');
    const [playing, setPlaying] = useState(true);

    return (
        <BackPlayerContext.Provider value={{
            id,
            setId,
            playing,
            setPlaying
        }}>
            <ViewPort>
                { children }
            </ViewPort>
        </BackPlayerContext.Provider>
    )
}


// ==================================================================

export function useBackPlayerContext(){

	const {
        id,
        setId,
        playing,
        setPlaying
    } = useContext(BackPlayerContext);
	

// ==================================================================

    const playSong = (id: string): void => {
        setId(id);
        setPlaying(true);
    }

    const stopSong = () => {
        setId('');
        setPlaying(false);
    }

    return {
        playSong,
        stopSong,
        id,
        playing
    }
}
