import React/*, { useState, useEffect }*/ from 'react';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import { Music, PlaylistProps } from 'common/types';
import { usePlaylistContext } from 'common/contexts/Playlist';
import { usePlayer } from 'common/contexts/player';
import istatic from "services/istatic";

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
const PlaylistOptions = Styled.section`
  display: none;
  margin-top: 30px;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 170px;

  @media(max-width: 1075px) { display: flex }
`
const OthersData = Styled.section`
  text-align: center;
  margin: 10px 0;

  @media(max-width: 1075px) { 
    margin-right: 60px;
  }
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

interface Props {
  id: string;
  playlist: PlaylistProps;
}
const PlaylistMetaData: React.FC<Props> = ({ id, playlist }) => {

	const { infors, list=[] } = playlist;
  const router = useRouter();
	const {
    playlistInfor,
    togglePlaylistShuffle,
    togglePlaylistLoop
  } = usePlaylistContext();
	const { load, stopPlayer } = usePlayer();

  const startList = (): void => {
    load({ playlist });
  }

  //Component:
  function CircleOptionComponent(){
    return(
      <>
        <CircleOption active={playlistInfor.playListShuffle} 
          onClick={() => togglePlaylistShuffle()} 
          src={istatic.iconUrl({ name: "shuffle" })} 
          alt="Shuffle"/>
        <CircleOption active={playlistInfor.playlistLoop} 
          onClick={() => togglePlaylistLoop()}
          src={istatic.iconUrl({ name: "loop" })} 
          alt="playlist loop"/>
        <CircleOption
          //onClick={() => setShowPopUp(true)}
          src={istatic.iconUrl({ name: "more_horiz" })} 
          alt="more playlist options"/>
      </>
    )
  }

	return (
    <PlaylistInfor>
      <BackIcon
        onClick={()=> router.back()}
        src={istatic.iconUrl({ name: "back" })}
        alt='back'
      />
      <PlayListImg src={infors.img} alt="PlayList Img"/>
      <OthersData>
        <PlaylistTitle>{infors.title}</PlaylistTitle>
        {infors.length &&
        	<PlaySubTitle>{infors.length} • Tracks</PlaySubTitle>
        }
        {infors.totalDuration &&
        	<PlaySubTitle>Duration: {infors.totalDuration}</PlaySubTitle>
        }
        <PlaylistOptions>
          <CircleOptionComponent/>
        </PlaylistOptions>
      </OthersData>
      <PlaylistActions>
        <AddPlaylist>
          <img src={istatic.iconUrl({ name: "add" })} alt="Add Playlist"/>
        </AddPlaylist>
        <StartPlaylist onClick={()=> {
          playlistInfor.playlistId === id
            ? stopPlayer()
            : startList()
        }}>
          {playlistInfor.playlistId === id ? 'Stop' : 'Start'} Playlist
          <img
            src={
              playlistInfor.playlistId === id 
                ? istatic.iconUrl({ name: "stop", color: "black" })
                : istatic.iconUrl({ name: "play_arrow", color: "black" })
            }
            alt="Start Playlist"
          />
        </StartPlaylist>
      </PlaylistActions>
    </PlaylistInfor>
	);
}

export default PlaylistMetaData;
