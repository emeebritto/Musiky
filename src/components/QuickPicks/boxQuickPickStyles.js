import Styled from "styled-components";
import { Link } from 'react-router-dom'

export const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
`
export const BoxIconPLayHover = Styled.img`
    display: none;
    filter: invert(100%);
`
export const BoxQuickPicks = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 250px;
    margin-bottom: 30px;
`
export const MusicOptionBox = Styled.section`
    display: flex;
    align-items: center;
    width: 48%;
    height: 40px;
    background-color: ;
    margin-bottom: 5px;

    :hover{
        cursor: pointer;
        border-left: 1px solid gray;
        border-right: 1px solid gray;
    }

    :hover .iconPlayHover {
        display: ${(props)=> (props.hoverOff ? "none" : "inline-block")};
    }
    :hover .MusicTime {
        display: none;
    }
`
export const BoxNumMusic = Styled(BoxQuickPicks)`
    margin-bottom: 4px;
    width: 18px;
    height: 100%;
`

const FontStyles = Styled.p`
    font-size: 0.9em;
    color: rgb(255 255 255/ 70%);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

export const ChannelName = Styled(Link)`
    text-decoration: none;
    font-size: 0.9em;
    color: rgb(255 255 255/ 70%);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

    :hover {
        color: rgb(255 255 255/ 90%);
    }
`
export const NumMusic = Styled(FontStyles)`

`
export const BoxImgMusic = Styled.img`
    width: 53px;
    border-radius: 5px;
    margin: 0px 8px;
`
export const DataMusic = Styled(MusicOptionBox)`
    height: 100%;
    width: 85%;
    margin-bottom: 0px;

    :hover{
        border-left: 0px;
        border-right: 0px;
    }
`
export const MusicTitle = Styled.p`
    font-size: 1.1em;
    width: 360px;
    color: white;
    -webkit-text-stroke-width: 0.0px;
    -webkit-text-stroke-color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 5px;
`
export const MusicTime = Styled(FontStyles)`
`