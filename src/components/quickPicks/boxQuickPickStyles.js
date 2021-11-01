import Styled from "styled-components";
import { Link } from 'react-router-dom'

export const ViewPort = Styled.section`
    width: 80%;
`

export const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    @media(max-width: 900px) {
        margin-left: 18px;
        margin-bottom: 23px;
    }

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`
export const BoxIconPLayHover = Styled.img`
    display: none;
    filter: invert(100%);
`
export const QuickPicksWrapper = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    height: 260px;
    overflow: scroll;
    margin-bottom: 30px;

    ::-webkit-scrollbar {
        width: 0;
    } 
`
export const MusicOptionBox = Styled.section`
    display: flex;
    align-items: center;
    width: 510px;
    height: 45px;
    margin: 0 7.7px 5px 7.7px;

    ::-webkit-scrollbar {
        width: 0;
    }   

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

    @media(max-width: 545px) {
        width: 380px;
        margin-right: 10px;

        :hover {
            border: none;
            background-color: rgb(255 255 255 / 7%);
        }
    }

    @media(max-width: 480px) {
        width: 320px;
        margin-right: 10px;

        :hover {
            border: none;
            background-color: rgb(255 255 255 / 7%);
        }
    }
`
export const BoxNumMusic = Styled.p`
    display: flex;
    align-items: center;
    width: 18px;
    height: 100%;
    margin-bottom: 4px;
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
export const DataMusic = Styled.section`
    display: flex;
    align-items: center;
    height: 100%;
    width: 85%;
    margin-right: 5%;
    margin-bottom: 0px;

    :hover{
        border-left: 0px;
        border-right: 0px;
    }
`
export const MusicTitle = Styled.p`
    font-size: 1.1em;
    width: 350px;
    color: white;
    -webkit-text-stroke-width: 0.0px;
    -webkit-text-stroke-color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 5px;

    @media(max-width: 545px) {
        font-size: 1.0em;
        width: 230px;
    }
`
export const MusicTime = Styled(FontStyles)`
    @media(max-width: 545px) {
        display: none;
    }
`