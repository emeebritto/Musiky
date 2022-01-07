import React from 'react';
import type { AppProps } from 'next/app';
import Styled from 'styled-components';

import {
  ErrorBoundary,
  Header, 
  NavBar, 
  PlayerControl,
  ReactPlayerComp,
  LirycScreen,
  Cursorlight
} from 'components';

import { PlayerProvider } from 'common/contexts/providers/Player-provider';
import { LyricProvider } from 'common/contexts/providers/Lyric-provider';
import { PlaylistProvider } from 'common/contexts/providers/Playlist-provider';
import { AccountProvider } from 'common/contexts/providers/Account-provider';
import { SplashProvider } from 'common/contexts/splash';
import { GlobalStyle } from 'common/GlobalStyle';


const Main = Styled.section`
  margin-left: 50px;
`


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SplashProvider>
      <GlobalStyle/>
      <ErrorBoundary>
        <NavBar/>
        <Cursorlight/>
        <Main>
          <AccountProvider>
            <PlaylistProvider>
              <PlayerProvider>
                <LyricProvider>
                  <LirycScreen/>
                  <ReactPlayerComp/>
                  <Header/> 
                  <Component {...pageProps} />
                  <PlayerControl/>
                </LyricProvider>
              </PlayerProvider>
            </PlaylistProvider>
          </AccountProvider>
        </Main>
      </ErrorBoundary>
    </SplashProvider>
  )
}

export default MyApp
