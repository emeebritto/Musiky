import React from "react";
import Styled from "styled-components";

import Search from '../search'
import PlaylistsRow from "../playlistsRow"
import DiskLibrarie from '../diskLibrarie'

const ViewPort = Styled.section`
    padding-top: 18vh;
    width: 80%;
    height: 100%;
    padding-bottom: 20vh;
`
function PlayList() {

    return (
        <ViewPort>
            <Search/>
            <DiskLibrarie name='long Songs | Ambient'/>
            <PlaylistsRow name='Mashup Songs'/>
        </ViewPort>
    )
}

export default PlayList;
