import React, { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import { PlayerProvider } from 'contexts/player';
import { LyricProvider } from 'contexts/providers/Lyric-provider';
import { PlaylistProvider } from 'contexts/providers/Playlist-provider';
import { AccountProvider } from 'contexts/providers/Account-provider';
import { SplashProvider } from 'contexts/splash';
import { FeaturedProvider } from 'contexts/Featured';
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

  if (router.route.includes("/embed/")) {
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
        <AccountProvider>
          <PlaylistProvider>
            <PlayerProvider>
              <LyricProvider>
                <ReactPlayerComp/>
                <Component {...pageProps} />
              </LyricProvider>
            </PlayerProvider>
          </PlaylistProvider>
        </AccountProvider>
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
      <meta name="description" content="live your feelings"/>
      <meta name="twitter:image" content="https://musiky.vercel.app/imgs/link_preview-home.jpg"/>
      <meta name="twitter:description" content="live your feelings"/>
      <meta name="twitter:url" content="https://musiky.vercel.app"/>
      <meta property="og:description" content="live your feelings"/>
      <meta property="og:title" content="Musiky"/>
      <meta property="og:site_name" content="Musiky"/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://musiky.vercel.app"/>
      <meta property="og:image" content="https://musiky.vercel.app/imgs/link_preview-home.jpg"/>
      <meta property="og:image:alt" content="Musiky Link Preview"/>
      <meta property="og:image:height" content="597"/>
      <meta property="og:image:secure_url" content="https://musiky.vercel.app/imgs/link_preview-home.jpg"/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="og:image:width" content="994"/>
      <meta property="og:locale" content="en_CA"/>

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
          <LoadingCube/>
          <Cursorlight/>
          <Main>
            <AccountProvider>
              <NavBar/>
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
