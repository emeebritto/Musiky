import React from "react";
import Styled from "styled-components";

import { BoxGreeting, BoxQuickPicks, PlaylistsRow, ArtistsRow } from 'components'

const ViewPort = Styled.section`
    margin-top: 18vh;
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;

    @media(max-width: 900px) {
        margin-top: 16vh;
        width: 100%;
    }
`
const Home = ({ loadingStates }) => {

    return (
        <ViewPort>
            <BoxGreeting/>
            <BoxQuickPicks/>
            <PlaylistsRow name='MIXs' viewMode='Resume' listType='MIXs' loadingStates={loadingStates}/>
            <ArtistsRow/>
        </ViewPort>
    );
}

export default Home