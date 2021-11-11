import React from "react";
import Styled from "styled-components";

import { BoxGreeting, BoxQuickPicks, PlaylistsRow, ArtistsRow } from 'components'

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
    margin: 20vh 0 10vh 0;

    @media(max-width: 900px) {
        margin-top: 16vh;
    }
`

const Home = ({ loadingStates }) => {

    return (
        <ViewPort>
            <Wrapper>
                <BoxGreeting/>
                <BoxQuickPicks/>
                <PlaylistsRow name='MIXs' loadingStates={loadingStates}/>
                <ArtistsRow maxResult={6}/>
                <PlaylistsRow name='Others MIXs' loadingStates={loadingStates}/>
                <PlaylistsRow name='Just Song' loadingStates={loadingStates}/>
            </Wrapper>
        </ViewPort>
    );
}

export default Home