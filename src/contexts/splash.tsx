import React, { useContext, createContext, useState } from 'react';
import Styled from 'styled-components';
import { SplashContextData, Music } from 'common/types';
import { SplashScreen } from 'components';


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

export const SplashContext = createContext<SplashContextData>({} as SplashContextData);
SplashContext.displayName = 'Splash';

export const SplashProvider: React.FC<LayoutProps> = ({ children }) => {
    
    const [splash, setSplash] = useState(true);

    return (
        <SplashContext.Provider value={{ splash, setSplash }}>
            <ViewPort>
                {splash && <SplashScreen/>}
                { children }
            </ViewPort>
        </SplashContext.Provider>
    )
}


// ==================================================================

export function useSplashContext(){

	const { splash, setSplash } = useContext(SplashContext);
	

// ==================================================================

    const desableSplash = (): void => {
        if(typeof setSplash == 'function') {
            setTimeout(() => setSplash(false), 4000);
        }
    };

    return { splash, desableSplash }
}
