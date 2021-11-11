import Styled from "styled-components";
import { Link } from 'react-router-dom'


export const BoxIconPLayHover = Styled.img`
    display: none;
    filter: invert(100%);
`
//510
export const MusicOptionBox = Styled.section`
    display: flex;
    align-items: center;
    height: 45px;
    margin: 0 0 5px 0;

    ::-webkit-scrollbar {
        width: 0;
    }   

    :hover{
        cursor: pointer;
        background-color: rgb(255 255 255 / 2%);
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

    :hover{
        border-left: 0px;
        border-right: 0px;
    }
`
export const Titles = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

export const MusicTitle = Styled.p`
    font-size: 1.1em;
    width: 350px;
    height: 23px;
    color: white;
    -webkit-text-stroke-width: 0.0px;
    -webkit-text-stroke-color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

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