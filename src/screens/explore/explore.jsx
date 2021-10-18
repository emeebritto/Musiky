import React from "react";
import Styled from "styled-components";
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { player, scroll } from 'controllers'

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
                    <DiskLibrary name='long Songs | Ambient' totalSongs={6} listType='ambienceSong' player={player}/>
                    <PlaylistsRow name='Other Mixs' player={player} viewMode='Resume' listType='othersMixs'/>
                    <DiskLibrary 
                        name='Mashup Songs' 
                        totalSongs={6} 
                        listType='mashupSongs' 
                        player={player}
                        loadingStates={loadingStates}
                    />                     
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
