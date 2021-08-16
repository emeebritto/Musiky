import React from "react";
import Styled from "styled-components";

import Search from '../search'
import PlaylistsRow from "../playlistsRow"
import DiskLibrary from '../diskLibrary'

const ViewPort = Styled.section`
    padding-top: 18vh;
    width: 80%;
    height: 100%;
    padding-bottom: 20vh;
`
function PlayList({ player, loadingStates }) {

    return (
        <ViewPort>
            <Search/>
            <DiskLibrary name='long Songs | Ambient' totalSongs={6} listType='ambienceSong' player={player}/>
            <PlaylistsRow name='Other Mixs' player={player} viewMode='Resume' listType='othersMixs'/>
            <DiskLibrary 
                name='Mashup Songs' 
                totalSongs={6} 
                listType='mashupSongs' 
                player={player}
                loadingStates={loadingStates}
            />
        </ViewPort>
    )
}

export default PlayList;
