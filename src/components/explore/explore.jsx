import React from "react";
import Styled from "styled-components";

import PlaylistsRow from "../playlistsRow"
const RandomList = PlaylistsRow;

const ViewPort = Styled.section`
    padding-top: 18vh;
    width: 80%;
    height: 100%;
    padding-bottom: 20vh;
`
function PlayList() {

    return (
        <ViewPort>
            <RandomList/>
            <RandomList/>
        </ViewPort>
    )
}

export default PlayList;
