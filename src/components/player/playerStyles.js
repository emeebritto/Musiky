import ReactPlayer from 'react-player'
import Styled from "styled-components";

export const ViewPort = Styled.section`
    position: absolute;
    background-color: transparent;
    padding-top: 16vh;
    overflow: hidden;
    height: 84vh;
    z-index: 2;
`
export const VideoPlayer = Styled(ReactPlayer)`
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
`

export const Blocker = Styled.section`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`