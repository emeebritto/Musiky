import React from 'react';
import type { AppProps } from 'next/app';
import Styled from 'styled-components';

import { 
  Header, 
  NavBar, 
  PlayerControl,
  ReactPlayerComp
} from 'components';

import PlayerProvider from 'common/contexts/providers/Player-provider';
import PlaylistProvider from 'common/contexts/providers/Playlist-provider';

import { GlobalStyle } from '../styles/GlobalStyle';


const ViewPort = Styled.section` 
  position: relative;
  background-color: rgb(0 0 0 /95%);
  overflow: scroll;
  width: 100vw;
  height: 100vh;
    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
`

const Main = Styled.section`
  margin-left: 50px;
`


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ViewPort>
      <PlaylistProvider>
        <PlayerProvider>
          <GlobalStyle/>
          <NavBar/>
          <Main>
            <ReactPlayerComp/>
            <Header/> 
            <Component {...pageProps} />
            <PlayerControl/>
          </Main>
        </PlayerProvider>
      </PlaylistProvider>
    </ViewPort>
  )
}

export default MyApp
