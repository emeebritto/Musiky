import React from "react";
import Styled from "styled-components";

import BoxQuickPicks from "../quickPicks";
import PlaylistsRow from "../playlistsRow"
const RandomMusic = PlaylistsRow;

const ViewPort = Styled.section`
    margin-top: 18vh;
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;
`
export default ({ player }) => {

    return (
        <ViewPort>
            <BoxQuickPicks player={player}/>
            <RandomMusic name='MIXs'/>
        </ViewPort>
    );
}
