import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Styled from "styled-components";
import cache from "memory-cache";
import { Music } from 'common/types';
import { istatic } from "api/istatic";
import { fromSecondsToTime } from 'common/utils';
import { usePlayerContext } from 'common/contexts/Player';


const ViewPort = Styled.section`
  overflow: hidden;
  width: 100%;
  height: 100vh;
`
const Branding = Styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background: url(${istatic.branding()}) no-repeat center/20% #020309;
`
const Alert = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #020309;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
  z-index: 97;
`
const PlayerWrapper = Styled.section`
  display: flex;
  align-items: center;
  border: 1px solid #D2D2CE;
  overflow: hidden;
  border-radius: 12px;
  width: 99.7vw;
  height: 85px;
`
const MusicThumbnail = Styled.img`
  height: 100%;
  cursor: pointer;
`
const DataAndControls = Styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Titles = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 80%;
  margin: 3px 0;
`
const Controls = Styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
`
const BtnPlayerControl = Styled.button`
  background-color: ${(props: {play?: boolean}) => (
      props.play ? "white" : "transparent"
  )};
  border: none;
  filter: invert(100%);
  min-width: 39px;
  height: 39px;
  border-radius: 30px;
  transition: 400ms;
  margin: 0 10px;

  :hover {
    cursor: pointer;
    background-color: rgb(255 255 255/${(props: {play?: boolean}) => (
      props.play ? "70%" : "0%"
    )});
    filter: invert(0%);
  }
`
const IconPlay = Styled.img`
  margin: 3px 0px 0px 0px;
  width: 100%;
`
const DurationSlider = Styled.input`
  -webkit-appearance: none;
  width: 80%;
  outline: none;
  height: 4px;
  border-radius: 5px;
  cursor: pointer;

  ::-webkit-slider-thumb{
    -webkit-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    top: 0px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 30px #000;
  }
`
const MusicTimeTotal = Styled.section`
  font-size: 0.75em;
  opacity: 0.8;
  margin: 0 15px;
`


interface EmbedProps {
  pageContent: Music | boolean;
};

const Embed: NextPage<EmbedProps> = ({ pageContent }) => {

  const goToMusiky = () => {
    window.open('https://musiky.vercel.app', '_blank');
  };

  if (typeof pageContent == 'boolean') {
    return (
      <Alert onClick={goToMusiky}>
        Musiky Embed API - Sorry, we don't found it (404)
      </Alert>
    )
  }

  const [showBranding, setShowBranding] = useState(true);

  const {
    prop,
    load,
    onPlayAndPause,
    handleSeekMouseUp,
    handleSeekMouseDown,
    handleSeekChange
  } = usePlayerContext();

  const handlePlayPause = (): void => {
    if (!prop.music) {
      load(0, [ pageContent ], 'embed3d');
      return;
    }
    onPlayAndPause();
  }

  useEffect(()=>{
    setTimeout(()=> {setShowBranding(false)}, 3000);
  },[])


  return (
    <>
    <Head>
      <title>Musiky - {pageContent.title}</title>
    </Head>
    <ViewPort>
      {showBranding && <Branding/>}
      <PlayerWrapper>
        <MusicThumbnail
          onClick={goToMusiky}
          src={pageContent.thumbnails[1].url}
          alt='music Image'
        />
        <DataAndControls>
          <Titles>
            <h1><strong>{pageContent.title}</strong> by {pageContent.artists[0]}</h1>
          </Titles>
          <Controls>
            <BtnPlayerControl play onClick={handlePlayPause}>
                <IconPlay
                  src={prop.playing 
                    ? istatic.iconPause() 
                    : istatic.iconPlay()
                  }
                  alt="Play or Pause"
                />
            </BtnPlayerControl>
            <DurationSlider
                type='range' min={0} max={0.999999} step='any' 
                value={prop.currentTime}
                onChange={handleSeekChange}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
            />
            <MusicTimeTotal>
                {fromSecondsToTime(prop.duration - prop.currentTimeSeconds)}
            </MusicTimeTotal>          
          </Controls>
        </DataAndControls>
      </PlayerWrapper>
    </ViewPort>
    </>
  )
}

export default Embed;

export const getServerSideProps: GetServerSideProps = async(context) => {
  let id: string | string[] | undefined = context?.params?.id;
  const URL = `${IstaticBaseUrl}music/${id}`;
  let pageContent = {};
  const cachedResponse = cache.get(URL);
  if (cachedResponse) {
    pageContent = cachedResponse;
  } else {
    pageContent = await axios.get(URL)
      .then(r => r.data.music)
      .catch(err => false)
    cache.put(URL, pageContent, 60 * 60000);
  }


  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}

/*
        <iframe
          src='http://localhost:3000/embed/JiwCTqYMVWo'
          width='600'
          height='87'>
        </iframe>
*/