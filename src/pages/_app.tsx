import React, { useState, useEffect } from 'react';
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
  Cursorlight,
  LoadingCube
} from 'components';


const Main = Styled.section`
  margin-left: 50px;
`


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

useEffect(() => {
    const handleStart = (url: string): void => {
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
    };
    const handleComplete = (url: string): void => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    //router.events.on("routeChangeError", handleError);
  }, [router]);

  if (router.route === "/embed/[id]") {
    return (
      <>
      <Head>
        <meta charSet="utf-8"/>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="author" content="Emerson_Britto"/>
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
      <meta charSet="utf-8"/>
      <link rel="icon" href="/favicon.ico"/>
      <link rel="manifest" href="/manifest.json"/>
      <meta name="keywords" content="Musiky, music player"/>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="theme-color" content="#020309"/>
      <meta name="author" content="Emerson_Britto"/>
      <title>Musiky</title>
    </Head>
    <SplashProvider>
      <GlobalStyle/>
      <ErrorBoundary>
        <FeaturedProvider>
          <NavBar/>
          {isLoading && <LoadingCube/>}
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
