import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PlayerProvider from './common/contexts/providers/Player-provider'
import PlaylistProvider from './common/contexts/providers/Playlist-provider'

import {
  TransitionLoadingBar,
  Header,
  PlayerControl,
  ReactPlayerComp,
  NavBar
} from './components';

import {
  Splashscreen,
  Home,
  Explore,
  PlayList,
  Search,
  ArtistsList,
  NotFound404
} from './screens';

import Styled from 'styled-components';


const Main = Styled.section`
  margin-left: 50px;
`

const Centralize = Styled.section`
  display: flex;
  justify-content: center; 
`


export default function Routes() {

  const [splash, setSplash] = useState(true) // Splash
  const [pageLoadingBar, setPageLoadingBar] = useState({loadingBar: false, contentLoaded: false}) //Loading Bar

  const loadingStates = {
    setSplash: status => { setSplash(status) },
    setPageLoadingBar: status => { setPageLoadingBar(status) },
    values: [splash, pageLoadingBar]
  }

  const sharedProps = {
    loadingStates,
  }

  const routes = [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/explore',
      component: Explore,
    },
    {
      path: '/library',
      component: Explore,
    },
    {
      path: '/playlist/:id',
      component: PlayList,
    },
    {
      path: '/search',
      component: Search,
    },
    {
      path: '/artists',
      component: ArtistsList,
    },
    {
      path: '*',
      component: NotFound404,
    },
  ];

  return (
    <Router>
      {splash && <Splashscreen/>}
      {pageLoadingBar.loadingBar && <TransitionLoadingBar loadingStates={loadingStates}/>}

      <PlaylistProvider>
        <PlayerProvider>

          <NavBar loadingStates={loadingStates}/>

          <Main>
            <ReactPlayerComp/>

            <Header loadingStates={loadingStates}/>
            
            <Centralize>
              <Switch>
              {routes.map((route, index) => (
                <Route exact={route.exact} path={route.path} key={index}>
                  <route.component {...sharedProps}/>
                </Route>
              ))}
              </Switch>
            </Centralize>

            <PlayerControl/>              
          </Main>

        </PlayerProvider>
      </PlaylistProvider>
    </Router>
  )
};