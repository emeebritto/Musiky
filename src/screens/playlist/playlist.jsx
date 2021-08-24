import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Styled from 'styled-components'

import * as S from './playlistStyles'

import {getPLaylists} from 'api'

import { player } from 'controllers'

import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'
import PausedAnim from 'assets/icons/AnimatedSvg/playingCompAnim'
import icon_playing from 'assets/icons/AnimatedSvg/playing.svg'
import iconBack from 'assets/icons/back_icon.svg'


const ViewPort = Styled.section`
    display: flex;
    justify-content: flex-end;
    width: 66%;
    margin: 20vh 0vw 20vh 0vw;
`

const Playlist = ({ loadingStates }) => {

    let history = useHistory()

    const { id } = useParams()

    const [playingIndex, setPLayingIndex] = useState(null)
    const [status, setStatus] = useState(false)
    const [playlist, setPlaylist] = useState({
        img: null,
        title: null,
        totalMusic: null,
        musicList: []
    })

    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        player.load(targetIndex, targetList, playlistId)
        setPLayingIndex(targetIndex)
    }

    const updateIndexPlaylist = ({indexOnPlaylist, playing}) => {
        if (id === player.props.playlistId){
            setPLayingIndex(indexOnPlaylist)
            setStatus(playing)
        }
    }

    useEffect(() => {

        async function getData() {
            let listType = id.split('cs50', 1)
            let data = await getPLaylists('Details', listType[0])

            if(data[id] === undefined){history.push('/404')}

            setPlaylist(data[id])

            if(loadingStates!==undefined){
                loadingStates.appLoading(false)
            }
        }
        getData()

        player.subscribe(updateIndexPlaylist)

        if (id === player.props.playlistId){
            setPLayingIndex(player.props.indexOnPlaylist)
        }

    },[])

    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icon_playing} alt="playingNow"/>
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>

        var match = playingIndex === index;
        var playing = status

        if(!playing && match){return <PausedAnim/>}

        return match ? iconPlaying : duration
    }

    return (
        <ViewPort>
            <S.PlaylistInfor>
                <S.BackIcon onClick={()=> {history.go(-1)}} src={iconBack} alt='back'/>
                <S.PlayListImg src={playlist.playListImg} alt="PlayList Img"/>
                <S.PlaylistTitle>{playlist.playListTitle}</S.PlaylistTitle>
                <S.PlaySubTitle>{playlist.totalMusic} Musics</S.PlaySubTitle>                    
            </S.PlaylistInfor>
            <S.MusicList>
            {playlist.musicList.map((music, i) => {
                return (
                    <S.BoxMusic hoverOff={playingIndex === i} 
                                onClick={() => { clickOnMusic(i, playlist.musicList, id) }} 
                                key={i}
                                >
                        <S.BoxNumMusic>
                            <S.NumMusic>{i + 1}.</S.NumMusic>
                        </S.BoxNumMusic>

                        <S.MusicImg src={music.snippet.thumbnails.medium.url} alt="Music img"/>

                        <S.MusicInfor>
                            <S.MusicTitle>{music.snippet.title}</S.MusicTitle>
                            <section>
                                {music.Artist.map((artist, i) => {
                                    let space='';
                                    if(i > 0){ space = ',  ' }
                                        
                                    return(
                                        <S.ChannelName 
                                            to={`/artist/${artist.replaceAll(' ', '_')}`}
                                            onClick={(e)=>{e.stopPropagation()}}
                                            >
                                            {space + artist}
                                        </S.ChannelName>
                                    )
                                })}
                            </section>
                        </S.MusicInfor>

                        <S.MusicTime>
                            <BoxDurationOrPLayingNow music={music} index={i}/>
                            <S.BoxIconPLayHover className="iconPlayHover" src={iconPlay} alt="iconPlay" />
                        </S.MusicTime>

                    </S.BoxMusic>
                )
            })}
            </S.MusicList>
        </ViewPort>
    )
}

export default Playlist