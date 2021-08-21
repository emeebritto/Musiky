import React from "react";
import Styled from "styled-components";

import BoxGreeting from "../boxGreeting"
import BoxQuickPicks from "../quickPicks"
import PlaylistsRow from "../playlistsRow"
import ArtistsRow from "../artistsRow"

const ViewPort = Styled.section`
    margin-top: 18vh;
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;

    @media(max-width: 690px) {
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