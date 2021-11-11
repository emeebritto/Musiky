import React, {useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Styled from 'styled-components';

import * as S from './playlistStyles';

import { msk_get } from 'api';

import { usePlayerContext } from 'common/contexts/Player';
import { usePlaylistContext } from 'common/contexts/Playlist';

import { istatic } from "api/istatic";

import PausedAnim from 'assets/playingCompAnim.jsx';


const ViewPort = Styled.section`
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
`

const Wrapper = Styled.section`
    display: flex;
    justify-content: flex-end;
    width: 84%;
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

    const { prop, load } = usePlayerContext();

    const { 
        playlistInfor, 
        isPlayingIndex,
        togglePlaylistShuffle,
        togglePlaylistLoop 
    } = usePlaylistContext();

    let history = useHistory();

    const { id } = useParams();

    const [playlist, setList] = useState({});


    useEffect(()=>{

        async function getData() {

            let musicList = await msk_get('playlist', { id });

            if(!musicList.list) history.push('/404');

            setList(musicList);

            if(loadingStates !== undefined){
                loadingStates.setSplash(false);
                loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: true});
            }
        }
        getData()

    },[])



    //Component:
    function CircleOptionComponent(){
        return(
            <>
                <CircleOption active={playlistInfor.playListShuffle} 
                    onClick={() => togglePlaylistShuffle()} 
                    src={istatic.iconRandom()} 
                    alt="Shuffle"/>
                <CircleOption active={playlistInfor.playlistLoop} 
                    onClick={() => togglePlaylistLoop()} 
                    src={istatic.iconLoop()} 
                    alt="playlist loop"/>
                <CircleOption 
                    src={istatic.iconShare()} 
                    alt="share playlist"/>
            </>
        )
    }

    //Component:
    function BoxDurationOrPLayingNow({duration, index}){

        let iconPlaying = <img src={istatic.icon_playing()} alt="playingNow"/>
        let durationComp = <p className="MusicTime">{duration}</p>

        let match = isPlayingIndex(id, index);

        if(!prop.playing && match) return <PausedAnim/>

        return match ? iconPlaying : durationComp
    }

    return (
        <>
        {playlist.infors &&
        <ViewPort>
            <Wrapper>
                <S.PlaylistInfor>
                    <S.BackIcon onClick={()=> history.go(-1)} src={istatic.backPage()} alt='back'/>

                    <S.PlayListImg src={playlist.infors.img} alt="PlayList Img"/>
                    <OthersData>
                        <S.PlaylistTitle>{playlist.infors.title}</S.PlaylistTitle>
                        <S.PlaySubTitle>{playlist.infors.length} Musics</S.PlaySubTitle>
                        <PlaylistOptions>
                            <CircleOptionComponent/>
                        </PlaylistOptions>
                    </OthersData>
                </S.PlaylistInfor>
                <S.MusicList>
                {playlist.list.map((music, i) => {
                    return (
                        <S.BoxMusic hoverOff={isPlayingIndex(id, i)} 
                                    onClick={() => load(i, playlist.list, id)} 
                                    key={music.id}
                                    >
                            <S.BoxNumMusic>
                                <S.NumMusic>{i + 1}.</S.NumMusic>
                            </S.BoxNumMusic>

                            <S.MusicImg src={music.thumbnails.medium.url} alt="Music img"/>

                            <S.MusicInfor>
                                <S.MusicTitle>{music.title}</S.MusicTitle>
                                <section>
                                    {music.artist.map((artist, i) => {
                                        let space='';
                                        if(i > 0){ space = ',  ' }
                                            
                                        return(
                                            <S.ChannelName 
                                                to={`/artist/${artist.replaceAll(' ', '_')}`}
                                                onClick={e => e.stopPropagation()}
                                                >
                                                {space + artist}
                                            </S.ChannelName>
                                        )
                                    })}
                                </section>
                            </S.MusicInfor>

                            <S.MusicTime>
                                <BoxDurationOrPLayingNow music={music.duration} index={i}/>
                                <S.BoxIconPLayHover className="iconPlayHover" src={istatic.iconPlay()} alt="iconPlay" />
                            </S.MusicTime>

                        </S.BoxMusic>
                    )
                })}
                </S.MusicList>
                <OptionsAside>
                    <CircleOptionComponent/>
                </OptionsAside>
            </Wrapper>
        </ViewPort>
        }
        </>
    )
}

export default Playlist