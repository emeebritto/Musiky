import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
  ArtistsList,
  NotFound404
} from './screens';

import Styled from 'styled-components';

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

      <NavBar loadingStates={loadingStates}/>
    </Router>
  )
};