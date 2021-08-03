import React from "react";
import Styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import BoxQuickPicks from "./QuickPicks";
import PlaylistsRow from "../playlistsRow"
const RandomMusic = PlaylistsRow;

const ViewPort = Styled.section`
    margin-top: 18vh;
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;
`
export default ({playingNow}) => {

    return (
        <ViewPort>
            <BoxQuickPicks playingNow={playingNow}/>
            <RandomMusic/>
        </ViewPort>
    );
}
