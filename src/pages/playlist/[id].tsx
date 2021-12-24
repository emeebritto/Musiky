import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Styled from 'styled-components';
import { PlaylistProps } from 'common/types';

import * as S from 'styles/pages/playlistStyles';

import { usePlayerContext } from 'common/contexts/Player';
import { usePlaylistContext } from 'common/contexts/Playlist';

import { PopUp } from 'components';

import { msk_get } from 'api';
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
    background-color: ${(props: {active?: boolean})=> (
        props.active ? "rgb(255 255 255 / 30%)" : "rgb(255 255 255 / 10%)"
    )};
    border: ${(props: {active?: boolean})=> (props.active ? "1px" : "0px")} solid gray;
    cursor: pointer;
    margin-bottom: 15px;
    transition: 300ms;

    :hover {
        background-color: rgb(255 255 255 / 20%);
    }
`

const OthersData = Styled.section`
    text-align: center;
    margin: 10px 0;

    @media(max-width: 1075px) { 
        margin-right: 60px;
    }
`

const Label = Styled.h2`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

const UrlField = Styled.section`
    display: flex;
    margin: 10px 0;
`

const Input = Styled.input`
    border: none;
    padding: 5px 10px;
    color: #fff;
    outline: none;
    background-color: #020207;
    border-radius: 8px;
`

const UrlInput = Styled(Input)`
    width: 395px;
`

const DownloadOptionInput = Styled(Input)`
    width: 375px;
`

const Btn = Styled.button`
    border: none;
    padding: 3px 10px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 6px;
`

const CopyBtn = Styled(Btn)`
    margin: 0 3px;
    background-color: #181318;
`

const DownloadBtn = Styled(Btn)`
    margin: 0 3px;
    background-color: #020222;
`

const DownloadOption = Styled.section`
    margin: 15px 0 0 20px;
`

const AvailableDownload = Styled.p`
    opacity: 0.7;
    margin: 15px 0 0 20px;
`

interface PlaylistPageProp {
    playlist: PlaylistProps;
}

interface DurationOrPLaying {
    duration: string;
    index: number;
}

const Playlist: NextPage<PlaylistPageProp> = ({ playlist }) => {

    const { infors, list=[] } = playlist;

    const { prop, load } = usePlayerContext();
    const [showPopUp, setShowPopUp] = useState(false);

    const { 
        playlistInfor, 
        isPlayingIndex,
        togglePlaylistShuffle,
        togglePlaylistLoop 
    } = usePlaylistContext();


    const router = useRouter();
    
    let id: string = router.query.id ? String(router.query.id) : '';


    useEffect(()=>{
        if(!playlist) router.push('/404');
    },[router])


    const copyUrl = () => {
        navigator.clipboard.writeText(location.href).then(()=> alert('copied'))
    }

    const download = () => {
        axios({
            url:`https://musiky-listen.herokuapp.com/${prop.music ? prop.music.id : ''}`,
            method:'GET',
            responseType: 'blob'
        })
        .then((response) => {
            const url = window.URL
                .createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${prop.music.artists[0]} - ${prop.music.title}.mp3`);
            document.body.appendChild(link);
            link.click();
        })
    }

  
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
                    onClick={() => setShowPopUp(true)}
                    src={istatic.more_horiz()} 
                    alt="more playlist options"/>
            </>
        )
    }

    //Component:
    const BoxDurationOrPLayingNow: React.FC<DurationOrPLaying> = ({duration, index}) =>{

        let iconPlaying = <img src={istatic.icon_playing()} alt="playingNow"/>
        let durationComp = <p className="MusicTime">{duration}</p>

        let match = isPlayingIndex(id, index);

        if(!prop.playing && match) return <PausedAnim/>

        return match ? iconPlaying : durationComp
    }


    return (
        <>
        {infors &&
        <ViewPort>
            <PopUp show={showPopUp} onRequestClose={()=> setShowPopUp(false)}>
                <section>
                    <Label>Playlist URL:</Label>
                    <UrlField>
                        <UrlInput
                            type='text'
                            value={typeof window !== 'undefined' ? location.href : ''}
                            readonly
                        />
                        <CopyBtn onClick={()=> copyUrl()}>
                            <img src={istatic.copyIcon()} alt='copy icon'/>
                        </CopyBtn>
                    </UrlField>
                </section>
                <section>
                    <Label>Downloads:</Label>
                    {prop.music &&
                        <DownloadOption>
                            <Label>Playing Now:</Label>
                            <UrlField>
                                <DownloadOptionInput
                                    type='text'
                                    value={`${prop.music.artists[0]} - ${prop.music.title}`}
                                    readonly
                                />
                                <DownloadBtn onClick={()=> download()}>
                                    <img src={istatic.downloadIcon()} alt='download icon'/>
                                </DownloadBtn>
                            </UrlField>
                        </DownloadOption>
                    }
                    {!prop.music && <AvailableDownload>Available</AvailableDownload>}
                    {false &&
                        <DownloadOption>
                            <Label>All Playlist:</Label>
                            <UrlField>
                                <DownloadOptionInput
                                    type='text'
                                    value={location.href}
                                    readonly
                                />
                                <DownloadBtn onClick={()=> copyUrl()}>
                                    <img src={istatic.downloadIcon()} alt='download icon'/>
                                </DownloadBtn>
                            </UrlField>                        
                        </DownloadOption>
                    }

                </section>
            </PopUp>
            <Wrapper>
                <S.PlaylistInfor>
                    <S.BackIcon onClick={()=> router.back()} src={istatic.backPage()} alt='back'/>

                    <S.PlayListImg src={infors.img} alt="PlayList Img"/>
                    <OthersData>
                        <S.PlaylistTitle>{infors.title}</S.PlaylistTitle>
                        <S.PlaySubTitle>{infors.length} Musics</S.PlaySubTitle>
                        <S.PlaySubTitle>Duration: {infors.totalDuration}</S.PlaySubTitle>
                        <PlaylistOptions>
                            <CircleOptionComponent/>
                        </PlaylistOptions>
                    </OthersData>
                </S.PlaylistInfor>
                <S.MusicList>
                {list.map((music, i) => {
                    return (
                        <S.BoxMusic hoverOff={isPlayingIndex(id, i)} 
                                    onClick={() => load(i, list, id)} 
                                    key={music.id}
                                    >
                            <S.BoxNumMusic>
                                <S.NumMusic>{i + 1}.</S.NumMusic>
                            </S.BoxNumMusic>

                            <S.MusicImg src={music.thumbnails.medium.url} alt="Music img"/>

                            <S.MusicInfor>
                                <S.MusicTitle>{music.title}</S.MusicTitle>
                                <section>
                                    {music.artists.map((artist, i) => {
                                        let space='';
                                        if(i > 0){ space = ',  ' }
                                            
                                        return(
                                            <Link
                                                href={`/artist/${artist.replace(/ /g, '_')}`}
                                                key={i}>
                                                <S.ChannelName onClick={e => e.stopPropagation()}>
                                                    {space + artist}
                                                </S.ChannelName>
                                            </Link>
                                        )
                                    })}
                                </section>
                            </S.MusicInfor>

                            <S.MusicTime>
                                <BoxDurationOrPLayingNow duration={music.duration} index={i}/>
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

export const getServerSideProps: GetServerSideProps = async(context) => {

    let id: string | string[] | undefined = context?.params?.id;
    let playlist = await msk_get('playlist', { id });

    return {
        props: { playlist }, // will be passed to the page component as props
    }
}
