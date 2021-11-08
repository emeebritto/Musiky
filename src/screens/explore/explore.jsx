import React from "react";
import Styled from "styled-components";
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { PlaylistsRow, DiskLibrary } from 'components'

const ViewPort = Styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 18vh;
    width: 100%;
    height: 100%;
    padding-bottom: 20vh;

    @media(max-width: 900px) {
        padding-top: 16vh;
        width: 100%;
    }
`
function Explore({ loadingStates }) {

    let match = useRouteMatch();


    return (
        <ViewPort>
            <Switch>
                <Route path={match.url}>
                    <PlaylistsRow 
                        name='Explore List' 
                        loadingStates={loadingStates}/>
                    <DiskLibrary 
                        name='long Songs | Ambient' 
                        totalSongs={6} 
                        type='ambienceSongs'/>
                    <PlaylistsRow 
                        name='Explore new Sets' 
                        loadingStates={loadingStates}/>                   
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

export default Explore;
