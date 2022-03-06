import React, { useState, useEffect } from 'react';
import Styled from "styled-components";
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import axios from 'axios';
import { devENV, IstaticBaseUrl } from 'api';
import { DataStorage } from 'common/storage';
import { Music, ArtistDataProps } from 'common/types';
import { useSplashContext } from 'common/contexts/splash';
import { usePlayer } from 'common/contexts/player';
import { TabTitle } from 'components';


const ViewPort = Styled.section`
  overflow-y: scroll;
  width: 100%;
  height: auto;
`
const Wrapper = Styled.section`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  margin: 15vh 0 10vh 0;
`
const MusicInfor = Styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 20%;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #000514;
`
const Text = Styled.p`
  font-size: 1.3em;
`
const VibeBtns = Styled.section`
  margin-top: 10vh;
  display: flex;
  justify-content: center;
  width: 60%;
  flex-wrap: wrap;
`
const VibeBtn = Styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  transition: 400ms;
  background-color: ${(props: {active: boolean}) => (
    props.active ? "#D9DADC" : "#001232"
  )};
  color: ${(props: {active: boolean}) => (
    props.active ? "#000" : "#fff"
  )};
  font-size: 1em;
  margin: 5px;
  cursor: pointer;
  box-shadow: 0 0 ${(props: {active: boolean}) => (
    props.active ? "20px" : "0"
  )} #D9DADC;

  :hover {
    background-color: ${(props: {active: boolean}) => (
      props.active ? "" : "#001257"
    )};
  }
`
const Actions = Styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60%;
  margin: 50px 0;
`
const Action = Styled.button`
  border: none;
  color: #fff;
  border-radius: 15px;
  padding: 5px 14px;
  cursor: pointer;
  font-size: 1.2em;
  background-color: #0085AB;
  box-shadow: 0 0 20px #00BCD7;
`
const ViewCode = Styled.p`
  width: 70%;
`

const WhatsTheVibe: NextPage = () => {

  const VIBE_KEY = '--thev1b4k4y_';

  const router = useRouter();
  const { load } = usePlayer();
  const { desableSplash } = useSplashContext();
  const [ currentMusic, setCurrentMusic ] = useState<Music | null>(null);
  const [ActiveVibes, setActiveVibes] = useState<string[]>([]);
  const [vibesOptions, setVibesOptions] = useState([
    'Happy',
    'Sad',
    'Very Sad',
    'Alone',
    'Old',
    'Heart Broken',
    'Relationship',
    'Night Love',
    'Chill Night',
    'Night',
    'Summer Party',
    'Melancholy',
    'Memories',
    'lo-fi',
    'chill',
    'Dance',
    'Slow Dance',
    'Slowed',
    'Messy Mind',
    'Rain',
    'Workout',
    'morning',
    'Late Afternoon',
    'intense fellings',
    'Driving At Night',
    'Desert',
    'Countryside',
    'Vibrant',
    'Drop',
    'Rock',
    'Young',
    'Electronic',
    'powerful',
    'Trap',
    'Rap'
  ]);

  const addVibe = (vb: string): void => {
    let newList = [...ActiveVibes, vb];
    setActiveVibes(newList);
  };
  const removeVibe = (vb: string): void => {
    let newList = [...ActiveVibes].filter((v: string)=> v != vb);
    setActiveVibes(newList);
  };
  const hasSome = (vb: string): boolean => {
    return ActiveVibes.some((v: string)=> v === vb);
  };
  const actionNext = () => {
    if (ActiveVibes.length && currentMusic) {
      let song = {
        title: currentMusic.title.replace(/\W|_/ig, ''),
        artist: currentMusic.artists[0].replace(/\W|_/ig, ''),
        vibes: ActiveVibes
      };
      let newList = [...DataStorage.get(VIBE_KEY), song];
      DataStorage.set(VIBE_KEY, newList);
    }
    setActiveVibes([]);
    getSong();
  };
  const actionClear = () => {
    setActiveVibes([]);
  };
  const actionClearStorage = () => {
    DataStorage.set(VIBE_KEY, null);
  };
  const actionCopyStorage = () => {
    navigator.clipboard.writeText(JSON.stringify(DataStorage.get(VIBE_KEY)))
      .then(()=> alert('copied'))
  };
  const actionSkip = () => {
    setActiveVibes([]);
    getSong();
  };

  async function getSong() {
    setCurrentMusic(
      await axios.get(`${IstaticBaseUrl}music/all?random=1&maxResult=1`)
        .then(r=> {
          let songlist = DataStorage.get(VIBE_KEY);
          let song = r.data.items[0];
          let evenExists = songlist
            .findIndex((ms: {title: string, artist: string}) => (
              ms.title === song.title.replace(/\W|_/ig, '')
              && ms.artist === song.artists[0].replace(/\W|_/ig, '')
            ));
          if (evenExists >= 0) {
            setActiveVibes(songlist[evenExists].vibes);
          }
          load({ media: song });
          return song;
        })
    );
  }

  useEffect(()=>{
    if (!devENV) {
      router.push('/');
      return;
    }
    desableSplash();
    (async() => {
      if (!DataStorage.get(VIBE_KEY)) {
        const vibesFromDB = await axios.get(`${IstaticBaseUrl}static/vibesDB.json`)
          .then(r => r.data);
        DataStorage.set(VIBE_KEY, [...vibesFromDB]);
      }
      getSong();
    })()
  },[])

  return (
    <>
    <TabTitle name={`Musiky - Whats is the Vibe`}/>
    <ViewPort>
      <Wrapper>
        {currentMusic &&
        <MusicInfor>
          <Text>ID: {currentMusic.id}</Text>
          <Text>TITLE: {currentMusic.title}</Text>
          <Text>ARTIST: {currentMusic.artists[0]}</Text>
        </MusicInfor>}
        <VibeBtns>
          {vibesOptions.map((vb, i) => {
            return (
              <VibeBtn
                onClick={()=> {
                  hasSome(vb)? removeVibe(vb) : addVibe(vb)
                }}
                active={hasSome(vb)}
                key={i}
              >
                  {vb}
              </VibeBtn>
            );
          })}
        </VibeBtns>
        <Actions>
          <Action onClick={actionClear}>Clear Selected</Action>
          <Action onClick={actionClearStorage}>Clear Storage</Action>
          <Action onClick={actionCopyStorage}>Copy Storage</Action>
          <Action onClick={actionNext}>Next</Action>
          <Action onClick={actionSkip}>Skip</Action>
        </Actions>
        <ViewCode>{JSON.stringify(DataStorage.get(VIBE_KEY))}</ViewCode>
      </Wrapper>
    </ViewPort>
    </>
  )
}

export default WhatsTheVibe;
