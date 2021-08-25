import Styled from 'styled-components'
import { Link } from 'react-router-dom'

/*

    @media(max-width: 1000px) {
        display: none;
    } */

export const PlaylistInfor = Styled.section`
    position: fixed;
    left: 15%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 22%;
`
export const MusicList = Styled.section`
    display: flex;
    flex-direction: column;
    width: 580px;
`
export const BackIcon = Styled.img`
    width: 35px;
    margin-bottom: 25px;
    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255 /4%);
    }
`
export const PlayListImg = Styled.img`
    width: 210px;
    height: 210px;
    border-radius: 10px;
    box-shadow: 1px 1px 30px rgb(0 0 0 / 35%);
    margin-bottom: 15px;
`
export const PlaylistTitle = Styled.p`
    color: white;
    font-size: 1.4em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 10px;
`
export const BoxMusic = Styled.section`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    border-radius: 5px;
    padding: 5px;
    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255 / 4%);
    }
    :hover .iconPlayHover {
        display: ${(props)=> (props.hoverOff ? 'none' : 'inline-block')};
    }
    :hover .MusicTime {
        display: none;
    }
`
export const BoxNumMusic = Styled.div`
    text-align: center;
    margin: 35px 3px 0px 3px;
    width: 25px;
    height: 100%;
`
export const NumMusic = Styled.p`
    color: rgb(255 255 255/ 70%);
`
export const MusicImg = Styled.img`
    width: 15%;
    border-radius: 6px;
    margin-right: 14px;
`
export const MusicInfor = Styled.section`
    width: 70%;
`
export const MusicTitle = Styled.p`
    color: white;
    font-size: 1.1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 3px;
`
export const BoxIconPLayHover = Styled.img`
    display: none;
    filter: invert(100%);
`

export const PlaySubTitle = Styled(PlaylistTitle)`
    color: #C4C4C4;
    font-size: 1.1em;
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
export const MusicTime = Styled(NumMusic)`
`