import React, {useState, useEffect} from "react"
import {dataBase as data} from "../../dataBase";
import Styled from "styled-components";
import {S, Ss} from "./playlistStyles"
import { useParams, useHistory } from 'react-router-dom'

import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg";
import icon_playing from '../../assets/icons/AnimatedSvg/playing.svg';

import {getPLaylists} from "../../api";
import iconBack from '../../assets/icons/back_icon.svg'


const ViewPort = Styled.section`
    display: flex;
    justify-content: flex-end;
    width: 66%;
    margin: 20vh 0vw 20vh 0vw;
`

export default ({playingNow}) => {

    const { id } = useParams()

    const [playingIndex, setPLayingIndex] = useState(null)
    const [playlist, setPlaylist] = useState({
        img: null,
        title: null,
        totalMusic: null,
        musicList: []
    })

    const clickOnMusic = (targetIndex, targetList, local) => {
        playingNow.startNewList(targetIndex, targetList, local)
        setPLayingIndex(targetIndex)
    }

    const updateIndex = (targetIndex, targetList) => {
        if (id === playingNow.playlistActive()){
            setPLayingIndex(targetIndex)
        }
    }

    useEffect(async() => {
        
        let playLists = await getPLaylists('playListDetails')
        let playListTarget = playLists[`${id}`]
        setPlaylist(playListTarget)

        playingNow.subscribe(updateIndex)

        if (id === playingNow.playlistActive()){
            setPLayingIndex(playingNow.playingIndex())
        }

        return () => {
            playingNow.unsubscribe(updateIndex)
        };

    }, [])

    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icon_playing} alt="playingNow"/>
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>

        var playing = playingIndex === index;

        return playing ? iconPlaying : duration
    }

    return (
        <ViewPort>
            <S.PlaylistInfor>
                <S.BackIcon src={iconBack} alt='back'/>
                <S.PlayListImg src={playlist.playListImg} alt="PlayList Img"/>
                <S.PlaylistTitle>{playlist.playListTitle}</S.PlaylistTitle>
                <Ss.PlaySubTitle>{playlist.totalMusic} Musics</Ss.PlaySubTitle>                    
            </S.PlaylistInfor>
            <S.MusicList>
            {playlist.musicList.map((music, index) => {
                return (
                    <S.BoxMusic hoverOff={playingIndex === index} 
                                onClick={() => { clickOnMusic(index, playlist.musicList, id) }} 
                                key={index}
                                >
                        <S.BoxNumMusic>
                            <S.NumMusic>{index + 1}.</S.NumMusic>
                        </S.BoxNumMusic>

                        <S.MusicImg src={music.snippet.thumbnails.medium.url} alt="Music img"/>

                        <S.MusicInfor>
                            <S.MusicTitle>{music.snippet.title}</S.MusicTitle>
                            <Ss.ChannelName>{music.snippet.channelTitle}</Ss.ChannelName>
                        </S.MusicInfor>

                        <Ss.MusicTime>
                            <BoxDurationOrPLayingNow music={music} index={index}/>
                            <S.BoxIconPLayHover className="iconPlayHover" src={iconPlay} alt="iconPlay" />
                        </Ss.MusicTime>

                    </S.BoxMusic>
                )
            })}
            </S.MusicList>
        </ViewPort>
    )
}

