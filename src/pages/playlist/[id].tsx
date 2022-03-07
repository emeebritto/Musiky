import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Styled from 'styled-components';
import { PlaylistProps, Music } from 'common/types';
import { usePlaylistContext } from 'common/contexts/Playlist';
import { usePlayer } from 'common/contexts/player';
import { useSplashContext } from 'common/contexts/splash';
import { IstaticBaseUrl } from 'api';
import { istatic } from "api/istatic";
import PausedAnim from 'assets/playingCompAnim.jsx';
import {
  MusicList,
  WarnBox,
  PlaylistMetaData,
  PlaylistMoreOptions,
  TabTitle
} from 'components';


const ViewPort = Styled.section`
  overflow-y: scroll;
  z-index: 1;
  width: 100%;
  height: 100vh;
`
const Wrapper = Styled.section`
  display: flex;
  justify-content: flex-end;
  width: 81%;
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
const MusicListWrapper = Styled.section`
  display: flex;
  flex-direction: column;
  width: 510px;
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
  border: ${(props: {active?: boolean})=> (
    props.active ? "1px" : "0px"
  )} solid gray;
  cursor: pointer;
  margin-bottom: 15px;
  transition: 300ms;

  :hover {
    background-color: rgb(255 255 255 / 20%);
  }
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
  const { desableSplash } = useSplashContext();
  const { load } = usePlayer();
  const router = useRouter();
  const [showPopUp, setShowPopUp] = useState(false);
  const [showWarnBox, setShowWarnBox] = useState(false);
  const [showUnavailable, setShowUnavailable] = useState(false);

  const {
    playlistInfor, 
    togglePlaylistShuffle,
    togglePlaylistLoop 
  } = usePlaylistContext();
    
  let id: string = router.query.id
    ? String(router.query.id) 
    : '';

  const startMedia = (playIndex: number): void => {
    load({ playIndex, playlist });
  };

  useEffect(()=>{
    if (list.some(ms => ms.unavailable)) {
      setShowWarnBox(true);
    };
  },[])

  if(infors.title) desableSplash();

  //Component:
  function CircleOptionComponent(){
    return(
      <>
        <CircleOption
          active={playlistInfor.playListShuffle} 
          onClick={() => togglePlaylistShuffle()} 
          src={istatic.iconRandom()} 
          alt="Shuffle"
        />
        <CircleOption
          active={playlistInfor.playlistLoop} 
          onClick={() => togglePlaylistLoop()}
          src={istatic.iconLoop()} 
          alt="playlist loop"
        />
        <CircleOption
          onClick={() => setShowPopUp(true)}
          src={istatic.more_horiz()} 
          alt="more playlist options"
        />
      </>
    )
  }

  return (
    <>
    <TabTitle name={`Playlist: ${infors.title}`}/>
    <ViewPort>
      <PlaylistMoreOptions
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        playlist={playlist}
      />
      <Wrapper>
        <PlaylistMetaData id={id} playlist={playlist}/>
        <MusicListWrapper>
          <WarnBox
            activeIf={showWarnBox}
            txt='Unavailable Music was hidden'
            action={{
              name: showUnavailable? 'hide' : 'show anyway',
              execute: ()=> {
                showUnavailable
                  ? setShowUnavailable(false)
                  : setShowUnavailable(true)
              }
            }}
            margin={'0 0 15px 0'}
          />
          <MusicList
            list={list}
            listId={id}
            startMedia={startMedia}
            showUnavailable={showUnavailable}
          />
        </MusicListWrapper>
        <OptionsAside>
          <CircleOptionComponent/>
        </OptionsAside>
      </Wrapper>
    </ViewPort>
    </>
  )
}

export default Playlist;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const id: string | string[] | undefined = context.params?.id;
  if(!id) return { notFound: true }

  const URL = `http://${context.req.headers.host}/api/playlist/${id}`;
  const playlist = await axios.get(URL).then(r => r.data);
  if(!playlist) return { notFound: true }

  return {
    props: { playlist } // will be passed to the page component as props
  }
}
