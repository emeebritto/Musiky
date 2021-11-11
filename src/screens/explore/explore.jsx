import React from "react";
import Styled from "styled-components";
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom'

import { PlaylistsRow, DiskLibrary } from 'components'

const ViewPort = Styled.section`
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
`

const Wrapper = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 15vh 0 10vh 0;

    @media(max-width: 900px) {
        margin-top: 16vh;
    }
`
function Explore({ loadingStates }) {

    let match = useRouteMatch();


    return (
        <ViewPort>
            <Wrapper>
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
            </Wrapper>
        </ViewPort>
    )
}

export default Explore;
