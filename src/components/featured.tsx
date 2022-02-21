import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { ArtistDataProps, Music } from "common/types";
import { useFeaturedContext } from 'common/contexts/Featured';
import { usePlayerContext } from 'common/contexts/Player';
import { FeaturedControl } from 'components';


const ViewPort = Styled.section`
  position: relative;
  width: 95.5vw;
  height: 65vh;
  overflow: hidden;
  margin: 0 0 3vh 0;
`
const PlayerWrapper = Styled.section`
  position: relative;
  top: -8vh;
`
const Thumbnail = Styled.section`
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props: {img: string | false}) => (
    props.img
    ? `url(${props.img}) center/70%`
    : `rgba(0, 0, 0, 0.6)`
  )};
  box-shadow: inset 0px -10px 330px #000, inset 0px -10px 50px #000;
  width: 100vw;
  height: 100vh;
  transition: 600ms;
`
const Data = Styled.section`
  position: absolute;
  display: flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.0);
  box-shadow: inset 0px -40px 70px #020309;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 95vw;
  left: 0;
  bottom: 0;
  padding: 10px 85px;
  z-index: 10;
`
const ProfileImg = Styled.img`
  width: 80px;
  border-radius: 50%;
  margin: 0 30px;
`
const Title = Styled.h3`
  font-weight: bold;
  font-size: 1.3em;
  margin-bottom: 8px;
`

const ArtistName = Styled.p`
  cursor: pointer;

  :hover {
    font-style: italic;
  }
`
const ListenNowBtn = Styled.button`
  padding: 5px 12px;
  background-color: transparent;
  cursor: pointer;
  color: #fff;
  font-size: 1.2em;
  border: 2px solid #fff;
  border-radius: 20px;
  margin-left: 60px;
  transition: 400ms;

  :hover {
    color: #000;
    background-color: #fff;
  }
`
interface RecProps {
  data: {
    clip: Music;
    artist: ArtistDataProps;
    instrumental: Music;
  } | undefined;
}

const Featured: React.FC<RecProps> = ({ data }) => {

  if (!data) return (<></>);

  const { preLoad, playing, stopAll } = useFeaturedContext();
  const { load } = usePlayerContext();

  const playMusic = (): void => {
    load(0, [ data.clip ], 'dfmskd76');
  }

  useEffect(()=>{
    preLoad(data.instrumental.id);
  },[])

  return (
    <ViewPort>
      <Data>
        <ProfileImg src={data.artist.images[1].url} alt='artist image'/>
        <section>
          <Title>{data.clip.title}</Title>
          <Link href={`/artist/${data.artist.name.replace(/\W/g, '-')}`}>
            <ArtistName>by {data.artist.name}</ArtistName>
          </Link>
        </section>
        <ListenNowBtn onClick={()=> playMusic()}>Listen Now</ListenNowBtn>
      </Data>
      <PlayerWrapper>
        {playing &&
          <ReactPlayer
            playing={playing}
            volume={0}
            url={`https://musiky-listen.herokuapp.com/${data.clip.id}?videoMode=1`}
            width='95vw'
            height='112vh'
            config={{
              youtube: {
                playerVars: { autoPlay: 1, controls: 0 },
              }
            }}
          />
        }
        <Thumbnail img={playing ? false : data.clip.thumbnails[3].url}/>
      </PlayerWrapper>
      <FeaturedControl/>
    </ViewPort >
  )
}

export default Featured;
