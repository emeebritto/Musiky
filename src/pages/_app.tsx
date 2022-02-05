import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import { PlayerProvider } from 'common/contexts/providers/Player-provider';
import { LyricProvider } from 'common/contexts/providers/Lyric-provider';
import { PlaylistProvider } from 'common/contexts/providers/Playlist-provider';
import { AccountProvider } from 'common/contexts/providers/Account-provider';
import { SplashProvider } from 'common/contexts/splash';
import { FeaturedProvider } from 'common/contexts/Featured';
import { GlobalStyle } from 'common/GlobalStyle';

import {
  ErrorBoundary,
  Header, 
  NavBar, 
  PlayerControl,
  FeaturedPlayer,
  ReactPlayerComp,
  LyricScreen,
  Cursorlight
} from 'components';


const Main = Styled.section`
  margin-left: 50px;
`


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    if("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
       navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
            console.log("Service Worker registration successful with scope: ", registration.scope);
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, [])

  if (router.route === "/embed/[id]") {
    return (
      <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle/>
      <ErrorBoundary>
        <PlaylistProvider>
          <PlayerProvider>
            <LyricProvider>
              <ReactPlayerComp/>
                <Component {...pageProps} />
            </LyricProvider>
          </PlayerProvider>
        </PlaylistProvider>
      </ErrorBoundary>
      </>
    )
  }
  return (
    <>
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="keywords" content="Musiky, music player" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <title>Musiky</title>
      <meta name="theme-color" content="#020309" />
    </Head>
    <SplashProvider>
      <GlobalStyle/>
      <ErrorBoundary>
        <FeaturedProvider>
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
                      <FeaturedPlayer/>
                      <Component {...pageProps} />
                      <PlayerControl/>
                  </LyricProvider>
                </PlayerProvider>
              </PlaylistProvider>
            </AccountProvider>
          </Main>
        </FeaturedProvider>
      </ErrorBoundary>
    </SplashProvider>
    </>
  )
}

export default MyApp
