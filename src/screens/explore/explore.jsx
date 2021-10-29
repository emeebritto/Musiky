import React from "react";
import Styled from "styled-components";
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { player } from 'controllers'

import { Search, PlaylistsRow, DiskLibrary } from 'components'

const ViewPort = Styled.section`
    padding-top: 18vh;
    width: 80%;
    height: 100%;
    padding-bottom: 20vh;

    @media(max-width: 900px) {
        padding-top: 16vh;
        width: 100%;
    }
`
function PlayList({ loadingStates }) {

    let match = useRouteMatch();


    return (
        <ViewPort>
            <Search/>
            <Switch>
                <Route path={match.url}>
                    <DiskLibrary 
                        name='long Songs | Ambient' 
                        totalSongs={6} 
                        type='ambienceSongs'/>
                    <PlaylistsRow 
                        name='Other Mixs' 
                        type='othersMixs'/>                   
                </Route>
                <Route path={`${match.path}/search/:input`}>
                    <h1 style={{color: 'white'}}>IN PROGRESS</h1>
                </Route>
                <Route path={"/explore/*"}>
                    <Redirect to="/404"/>
                </Route>
            </Switch>
        </ViewPort>
    )
}

export default PlayList;
