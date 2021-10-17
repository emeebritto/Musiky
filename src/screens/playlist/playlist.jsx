import React, {useState, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Styled from 'styled-components'

import * as S from './playlistStyles'

import { msk_get } from 'api'

import { player } from 'controllers'

import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'
import PausedAnim from 'assets/icons/AnimatedSvg/playingCompAnim'
import icon_playing from 'assets/icons/AnimatedSvg/playing.svg'
import iconBack from 'assets/icons/back_icon.svg'

import iconRandom from 'assets/icons/shuffle_white_24dp.svg'
import iconLoop from 'assets/icons/loop_white_24dp.svg'
import iconShare from 'assets/icons/share_white_24dp.svg'


const ViewPort = Styled.section`
    display: flex;
    justify-content: flex-end;
    width: 71%;
    margin: 20vh 0vw 20vh 0vw;


    @media(max-width: 1230px) { width: 85% }
    @media(max-width: 1075px) { 
        align-items: center;
        flex-direction: column;
    }

    @media(max-width: 755px) { 
        width: 100%;
    }

    @media(max-width: 570px) { 
        margin-top: 17vh;
    }

    @media(max-width: 499px) {
        margin-top: 14vh;
    }
`

const PlaylistOptions = Styled.section`
    display: none;
    margin-top: 30px;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 170px;

    @media(max-width: 1075px) { display: flex }
`

const OptionsAside = Styled.aside`
    position: fixed;
    top: 21vh;
    right: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50px;
    height: 50%;

    @media(max-width: 1230px) { right: 2.5% }
    @media(max-width: 1075px) { display: none }

`

const CircleOption = Styled.img`
    border-radius: 70px;
    width: 25px;
    height: 25px;
    padding: 12px;
    background-color: ${(props)=> (props.active ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 10%)")};
    border: ${(props)=> (props.active ? "1px" : "0px")} solid gray;
    cursor: pointer;
    margin-bottom: 15px;
    transition: 300ms;

    :hover {
        background-color: rgb(255 255 255 / 20%);
    }
`

const OthersData = Styled.section`
    text-align: center;

    @media(max-width: 1075px) { 
        margin-right: 60px;
    }
`

const Playlist = ({ loadingStates }) => {

    let history = useHistory()

    const { id } = useParams()

    const [playingIndex, setPLayingIndex] = useState(null)
    const [status, setStatus] = useState(false)
    const [shuffle, setShuffle] = useState(false)
    const [loop, setLoop] = useState(false)
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

    const handlePlaylistLoop = () => {
        player.togglePlaylistLoop();
        setLoop(loop => !loop)
    }

    const handleshuffle = () => {
        player.toggleShuffle();
        setShuffle(shuffle => !shuffle)
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
            let data = await msk_get.playlists('Details', { listType: listType[0] })

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
    function CircleOptionComponent(){
        return(
            <>
                <CircleOption active={shuffle} onClick={() => handleshuffle()} src={iconRandom} alt="Shuffle"/>
                <CircleOption active={loop} onClick={() => handlePlaylistLoop()} src={iconLoop} alt="playlist loop"/>
                <CircleOption src={iconShare} alt="share playlist"/>
            </>
        )
    }

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
        <>
        <ViewPort>
            <S.PlaylistInfor>
                <S.BackIcon onClick={()=> {history.go(-1)}} src={iconBack} alt='back'/>
                <S.PlayListImg src={playlist.playListImg} alt="PlayList Img"/>
                <OthersData>
                    <S.PlaylistTitle>{playlist.playListTitle}</S.PlaylistTitle>
                    <S.PlaySubTitle>{playlist.totalMusic} Musics</S.PlaySubTitle>
                    <PlaylistOptions>
                        <CircleOptionComponent/>
                    </PlaylistOptions>
                </OthersData>
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
        <OptionsAside>
            <CircleOptionComponent/>
        </OptionsAside>
        </>
    )
}

export default Playlist