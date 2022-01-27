import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Styled from 'styled-components';
import { PlayerProvider } from 'common/contexts/providers/Player-provider';
import { LyricProvider } from 'common/contexts/providers/Lyric-provider';
import { PlaylistProvider } from 'common/contexts/providers/Playlist-provider';
import { AccountProvider } from 'common/contexts/providers/Account-provider';
import { SplashProvider } from 'common/contexts/splash';
import { BackPlayerProvider } from 'common/contexts/backPlayer';
import { GlobalStyle } from 'common/GlobalStyle';

import {
  ErrorBoundary,
  Header, 
  NavBar, 
  PlayerControl,
  BackPlayer,
  ReactPlayerComp,
  LyricScreen,
  Cursorlight
} from 'components';


const Main = Styled.section`
  margin-left: 50px;
`


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SplashProvider>
      <GlobalStyle/>
      <ErrorBoundary>
        <BackPlayerProvider>
          <NavBar/>
          <Cursorlight/>
          <Main>
            <AccountProvider>
              <PlaylistProvider>
                <PlayerProvider>
                  <LyricProvider>
                    <LyricScreen/>
                    <ReactPlayerComp/>
                    <Header/>
                      <BackPlayer/>
                      <Component {...pageProps} />
                      <PlayerControl/>
                  </LyricProvider>
                </PlayerProvider>
              </PlaylistProvider>
            </AccountProvider>
          </Main>
        </BackPlayerProvider>
      </ErrorBoundary>
    </SplashProvider>
    </>
  )
}

export default MyApp
