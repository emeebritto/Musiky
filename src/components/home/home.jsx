import React from "react";
import Styled from "styled-components";

import BoxQuickPicks from "../quickPicks";
import PlaylistsRow from "../playlistsRow"

const ViewPort = Styled.section`
    margin-top: 18vh;
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;
`
const Home = ({ player, loadingStates }) => {

    return (
        <ViewPort>
            <BoxQuickPicks player={player}/>
            <PlaylistsRow name='MIXs' player={player} viewMode='Resume' listType='MIXs' loadingStates={loadingStates}/>
        </ViewPort>
    );
}

export default Home