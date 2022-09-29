import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Styled from "styled-components";
import { Music, UnavailableMusic } from 'common/types';
import { usePlayer } from 'contexts/player';
import { usePlaylistContext } from 'contexts/Playlist';
import { istatic } from "services";
import PausedAnim from 'assets/playingCompAnim.jsx';


const BoxIconPLayHover = Styled.img`
  display: none;
  filter: invert(100%);
  margin: 0 8.5px;
`
const MusicOptionBox = Styled.section`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  width: 500px;
  height: 45px;
  margin: 2.5px 0;

  ::-webkit-scrollbar {
    width: 0;
  }

  :hover{
    cursor: pointer;
    background-color: rgb(255 255 255 / 2%);
  }

  :hover .iconPlayHover {
    display: ${(props: {hoverOff?: boolean}) => (
      props.hoverOff ? "none" : "inline-block"
    )};
  }
  :hover .MusicTime {
    display: none;
  }

  @media(max-width: 545px) {
    width: 380px;
    margin-right: 10px;

    :hover {
      border: none;
      background-color: rgb(255 255 255 / 7%);
    }
  }

  @media(max-width: 480px) {
    width: 320px;
    margin-right: 10px;

    :hover {
      border: none;
      background-color: rgb(255 255 255 / 7%);
    }
  }
`
const BoxNumMusic = Styled.p`
  display: flex;
  align-items: center;
  width: 36px;
  height: 100%;
  margin-bottom: 4px;
`
const FontStyles = Styled.p`
  font-size: 0.9em;
  color: rgb(255 255 255/ 70%);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const ChannelName = Styled.a`
  text-decoration: none;
  font-size: 0.9em;
  color: rgb(255 255 255/ 70%);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;

  :hover {
    color: rgb(255 255 255/ 90%);
  }
`
const NumMusic = Styled(FontStyles)`
`
const BoxImgMusic = Styled.img`
  width: 53px;
  border-radius: 5px;
  margin: 0px 8px;
`
const DataMusic = Styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  width: 85%;
  margin-right: 5%;

  :hover{
    border-left: 0px;
    border-right: 0px;
  }
`
const Titles = Styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const MusicTitle = Styled.p`
  font-size: 1.1em;
  width: 350px;
  height: 23px;
  color: white;
  -webkit-text-stroke-width: 0.0px;
  -webkit-text-stroke-color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media(max-width: 545px) {
    font-size: 1.0em;
    width: 230px;
  }
`
const NamesList = Styled.ul`
    display: flex;
`
const MusicTime = Styled.section`
  text-align: center;
  font-size: 0.9em;
  width: 100px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  @media(max-width: 545px) {
    display: none;
  }
`


interface MusicListProps {
  list:Music[] | [];
  listId:string;
  startMedia:(s:number) => void;
  showUnavailable?:boolean;
}

interface DurationOrPLaying {
  duration:string;
  index:number;
}

const MusicList: React.FC<MusicListProps> = ({
  list,
  listId,
  startMedia,
  showUnavailable=false
}) => {

  const { prop, load } = usePlayer();
  const { isPlayingIndex } = usePlaylistContext();

  // useEffect(()=>{
  //   load({ wsMedia: 'ws_ch67' });
  // },[])

  //Component:
  const BoxDurationOrPLayingNow: React.FC<DurationOrPLaying> = ({
    duration,
    index
  }) => {
    let iconPlaying = <img src={istatic.animatedSvgUrl({ name: "playing" })} alt="playingNow"/>;
    let durationComp = <p className="MusicTime">{duration}</p>;

    let match = isPlayingIndex(listId, index);
    if(!prop.playing && match) return <PausedAnim/>;

    return match ? iconPlaying : durationComp
  }

  return (
    <>
    {list.map((music, index) => {
      if (music.unavailable && !showUnavailable) {
        return (<></>);
      } else if (music.unavailable && showUnavailable) {
        return (
          <MusicOptionBox
            onClick={(e) => e.stopPropagation()}
            key={music.id + index}
            >
            <BoxNumMusic>
              <NumMusic>{index + 1}.</NumMusic>
            </BoxNumMusic>
            <DataMusic>
              <BoxImgMusic src={istatic.baseUrl + music.thumbnails[1].url} alt="imgMusic" />
              <Titles>
                <MusicTitle>[ Unavailable Music ]</MusicTitle>
              </Titles>
            </DataMusic>
            <MusicTime>
              <BoxDurationOrPLayingNow
                duration='00:00'
                index={index}
              />
              <BoxIconPLayHover
                className="iconPlayHover"
                src={istatic.iconUrl({ name: "play_arrow", color: "black" })}
                alt="iconPlay"
              />
            </MusicTime>
          </MusicOptionBox>
        );
      }
      return (
        <MusicOptionBox 
          hoverOff={isPlayingIndex(listId, index)} 
          onClick={(e) => {
            e.stopPropagation();
            startMedia(index);
          }}
          key={music.id}
          >
          <BoxNumMusic>
            <NumMusic>{index + 1}.</NumMusic>
          </BoxNumMusic>
          <DataMusic>
            <BoxImgMusic src={istatic.baseUrl + music.thumbnails[1].url} alt="imgMusic" />
            <Titles>
              <MusicTitle>{music.title}</MusicTitle>
              <NamesList>
                {music.artists.map((artist, index) => {
                  let leftSpace = '';
                  if(index > 0) leftSpace = ',  ';
                  return(
                    <li key={index + artist.altId}>
                      <Link 
                          href={`/artist/${artist.altId}`}
                      >
                        <ChannelName onClick={(e)=>{e.stopPropagation()}}>
                          {leftSpace + artist.name}
                        </ChannelName>
                      </Link>
                    </li>
                  )
                })}
              </NamesList>
            </Titles>
          </DataMusic>
          <MusicTime>
            <BoxDurationOrPLayingNow
              duration={music.duration}
              index={index}
            />
            <BoxIconPLayHover
              className="iconPlayHover"
              src={istatic.iconUrl({ name: "play_arrow", color: "black" })}
              alt="iconPlay"
            />
          </MusicTime>
        </MusicOptionBox>
      )
    })}
    {!list.length && <p>Nothing</p>}
    </>
  )
}

export default MusicList;
