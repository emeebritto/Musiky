import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Styled from 'styled-components';
import { PlaylistProps, Music } from 'common/types';
import { usePlayerContext } from 'common/contexts/Player';
import { usePlaylistContext } from 'common/contexts/Playlist';
import { useSplashContext } from 'common/contexts/splash';
import { PopUp, MusicList, PlaylistMoreOptions } from 'components';
import { BaseUrl, IstaticBaseUrl } from 'api';
import { istatic } from "api/istatic";
import PausedAnim from 'assets/playingCompAnim.jsx';


const ViewPort = Styled.section`
    overflow-y: scroll;
    z-index: 1;
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
const PlaylistInfor = Styled.section`
    position: fixed;
    left: 15%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 22%;

    @media(max-width: 1230px) { left: 12% }

    @media(max-width: 1075px) { 
        left: 0%;
        position: relative;
        flex-direction: row;
        justify-content: center;
        width: 95%;
        margin-bottom: 50px;
    }
`
const BackIcon = Styled.img`
    width: 35px;
    border-radius: 8px;
    margin-bottom: 25px;

    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255 /3%);
    }

    @media(max-width: 1075px) { 
        margin-bottom: 0px;
    }

    @media(max-width: 570px) { 
        display: none;
    }
`
const PlayListImg = Styled.img`
    width: 190px;
    height: 190px;
    border-radius: 10px;
    box-shadow: 1px 1px 30px rgb(0 0 0 / 35%);
    margin-bottom: 15px;

    @media(max-width: 1075px) { 
        margin: 0 50px 0 40px;
    }

    @media(max-width: 620px) { 
        width: 190px;
        height: 190px;
    }

    @media(max-width: 499px) {
        width: 170px;
        height: 170px;
        margin: 0 15px 0 55px;
    }
`
const PlaylistTitle = Styled.p`
    color: white;
    font-size: 1.4em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 10px;
`
const PlaySubTitle = Styled(PlaylistTitle)`
    color: #fff;
    opacity: 0.7;
    font-size: 1em;
`
const PlaylistActions = Styled.section`
    display: flex;
`
const Btn = Styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    border-radius: 16px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 1em;
    font-weight: bold;
    padding: 3px 8px;
    margin: 0 5px;
`
const AddPlaylist = Styled(Btn)`

`
const StartPlaylist = Styled(Btn)`
    background-color: #D8D7DF;
    color: #000;
    transition: 400ms;

    :hover {
        background-color: #000;
        color: #D8D7DF;

        img {
            filter: invert(100%);
        }
    }

`
const MusicListWrapper = Styled.section`
    display: flex;
    flex-direction: column;
    width: 560px;
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
    right: 13%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50px;
    height: 50%;

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


interface PlaylistPageProp {
    playlist: PlaylistProps;
    mode: string;
}

interface DurationOrPLaying {
    duration: string;
    index: number;
}

const Playlist: NextPage<PlaylistPageProp> = ({ playlist, mode }) => {

    const { infors, list=[] } = playlist;
    const { desableSplash } = useSplashContext();
    const router = useRouter();
    const { prop, load, stopPlayer } = usePlayerContext();
    const [showPopUp, setShowPopUp] = useState(false);

    const {
        playlistInfor, 
        isPlayingIndex,
        togglePlaylistShuffle,
        togglePlaylistLoop 
    } = usePlaylistContext();
    
    let id: string = router.query.id ? String(router.query.id) : '';

    const startList = (
        targetIndex: number,
        targetList: Array<Music>,
        playlistId: string
    ): void => {
        load(targetIndex, targetList, playlistId);
    }

    if(infors.title) desableSplash();


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
        <Head>
            <title>Playlist: {infors.title}</title>
        </Head>
        <ViewPort>
            <PlaylistMoreOptions
                showPopUp={showPopUp}
                setShowPopUp={setShowPopUp}
                playlist={playlist}
            />
            <Wrapper>
                <PlaylistInfor>
                    <BackIcon onClick={()=> router.back()} src={istatic.backPage()} alt='back'/>

                    <PlayListImg src={infors.img} alt="PlayList Img"/>
                    <OthersData>
                        <PlaylistTitle>{infors.title}</PlaylistTitle>
                        {infors.length && <PlaySubTitle>{infors.length} • Tracks</PlaySubTitle>}
                        {infors.totalDuration && <PlaySubTitle>Duration: {infors.totalDuration}</PlaySubTitle>}
                        <PlaylistOptions>
                            <CircleOptionComponent/>
                        </PlaylistOptions>
                    </OthersData>
                    <PlaylistActions>
                        <AddPlaylist>
                            <img src={istatic.addIcon()} alt="Add Playlist"/>
                        </AddPlaylist>
                        <StartPlaylist onClick={()=> {
                            playlistInfor.playlistId === id
                                ? stopPlayer()
                                : startList(0, list, id)
                        }}>
                            {playlistInfor.playlistId === id ? 'Stop' : 'Start'} Playlist
                            <img
                                src={
                                    playlistInfor.playlistId === id 
                                        ? istatic.stopIcon()
                                        : istatic.iconPlay()
                                }
                                alt="Start Playlist"/>
                        </StartPlaylist>
                    </PlaylistActions>
                </PlaylistInfor>
                <MusicListWrapper>
                    <MusicList list={list} listId={id}/>
                </MusicListWrapper>
                <OptionsAside>
                    <CircleOptionComponent/>
                </OptionsAside>
            </Wrapper>
        </ViewPort>
        </>
    )
}

export default Playlist

export const getServerSideProps: GetServerSideProps = async(context) => {

    let playlist = {
        id: '',
        infors: {
            id: '',
            title: '',
            img: ''
        },
        list: []
    };

    const id: string | string[] | undefined = context.params?.id;
    const ikey: string | string[] | undefined = context.query?.ikey;
    const mode: string | string[] | undefined = context.query?.mode;

    if(!id) return { notFound: true }

    if (mode == 'radio') {
        let { list } = await axios.get(`${IstaticBaseUrl}playlist/${ikey}`).then(r=>r.data);
        playlist.list = list;
        playlist.id = String(id);
        playlist.infors.id = String(id);
        playlist.infors.title = `Mix - ${list[0].title}`;
        playlist.infors.img = list[0].thumbnails[1].url;
    } else {
        playlist = await axios.get(`${BaseUrl}/playlist/${id}`)
            .then(r => r.data);
    }


    if(!playlist) return { notFound: true }

    return {
        props: { playlist, mode: mode || null } // will be passed to the page component as props
    }
}
