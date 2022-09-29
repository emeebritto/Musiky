import React from 'react';
import Link from 'next/link';
import Styled from "styled-components";
import faker from 'faker';
import { SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { usePlayer } from 'contexts/player';
import { usePlaylistContext } from 'contexts/Playlist';
import istatic from 'services/istatic';
import { PlaylistProps } from 'common/types';
import { VerticalView, SwiperBtns } from 'components';


const PlayList = Styled.section`
  position: relative;
  display: flex;
  text-decoration: none;
  justify-content: space-around;
  flex-direction: column;
  width: 150px;
  height: 240px;
  margin: 0 15px;
  transition: 100ms;

  :hover {
    cursor: pointer;
    transform: ${(props: {playHoverOff: boolean}) => (
        props.playHoverOff ? "" : "translateY(-5px)"
    )};
  }

  :hover #BtnPLayHover {
    ${(props: {playHoverOff: boolean}) => (
      props.playHoverOff 
      ? "display: none"
      : "display: inline-block"
    )};
  }

`
const PlayingList = Styled.img`
  display: ${(props: {active: boolean}) => (props.active ? "" : "none")};
  position: absolute;
  width: 30px;
  top: 30%;
  left: 40%;
`
const BtnPLayHover = Styled.button`
  display: none;
  border: none;
  position: absolute;
  background-color: #131313;
  cursor: pointer;
  z-index: 2;
  width: 40px;
  height: 40px;
  top: 105px;
  left: 97px;
  border-radius: 19px;
  box-shadow: 5px 5px 30px black;
`
const ShadowHover = Styled.section`
  position: absolute;
  top: 0px;
  left: -1px;
  width: 40px;
  height: 40px;
  z-index: 0;
  border-radius: 60px;
  background-color: rgb(0 0 0 / 30%);
  transition: 400ms;

  :hover {
    transform: scale(3.7);
  }
`

const BtnPLayHoverImg = Styled.img`
  width: 100%;
  margin-top: 2px;
  filter: invert(100%);
`

const PlayListImg = Styled.img`
  position: relative;
  border-radius: 6px;
  width: 150px;
  height: 150px;
  filter: ${(props: {fade: boolean}) => (
    props.fade ? "brightness(0.4)" : "brightness(1)"
  )};
  :hover {
    border-bottom: 5px solid #4000A9;
  }
`

const PlayListTitle = Styled.h2`
  min-height: 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2em;
  margin: 0 0 5px 5px;
`
const Description = Styled.p`
  color: white;
  color: rgb(255 255 255/ 65%);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left: 5px;
`


interface PlayListRowProps {
  name: string;
  data: Array<PlaylistProps>
}

const PlayListRow: React.FC<PlayListRowProps> = ({ name, data }) => {

  const { load } = usePlayer();
  const { playlistInfor } = usePlaylistContext();

  const startList = async(playlistId: string): Promise<void> => {
    let playlist = await axios.get(`${location.origin}/api/playlist/${playlistId}`)
      .then(r=>r.data)
      .catch(err => console.error(err));
    load({ playlist });
  }

  const isPlaying = (id: string): boolean => {
    if (!playlistInfor.playlistId) return false;
    return id === playlistInfor.playlistId;
  }

  return (
    <VerticalView viewLabel={name} margin='20px 0'>
      {data.map((playlist, index) => {
        let playing = isPlaying(playlist.id);
        return (
          <SwiperSlide
            key={index + faker.datatype.uuid()}
          >
          <Link
            href={`/playlist/${playlist.infors.playlistId}`}
          >
            <PlayList playHoverOff={playing}>
            	<PlayListImg 
                id="PlayListImg" 
                src={istatic.baseUrl + playlist.infors.img}
                fade={playing}
              />
                <PlayingList
                  src={istatic.animatedSvgUrl({ name: "playing-bar" })}
                  alt="playing list"
                  active={playing}
                />
                <BtnPLayHover 
                  onClick={e => {
                    e.preventDefault()
                    e.stopPropagation()
                    startList(playlist.infors.playlistId)
                  }}
                  id="BtnPLayHover">
                  <BtnPLayHoverImg
                      src={istatic.iconUrl({ name: "play_arrow", color: "black" })}
                      alt="play icon"
                  />
                  <ShadowHover/>
                </BtnPLayHover>
            	<section>
            		<PlayListTitle>{playlist.infors.title}</PlayListTitle>
            		<Description>{playlist.infors.length} • Tracks</Description>
            	</section>
            </PlayList>
          </Link>
          </SwiperSlide>
        )
      })}
      <SwiperBtns left='-5px' right='-5px'/>
    </VerticalView>
  )
}

export default PlayListRow