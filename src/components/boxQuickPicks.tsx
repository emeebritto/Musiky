import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Styled from "styled-components";
import { Music, PlaylistProps } from 'common/types';
import { MusicList } from 'components';
import istatic from 'services/istatic';
import { usePlayer } from 'contexts/player';
import { usePlaylistContext } from 'contexts/Playlist';


const ViewPort = Styled.section`
  width: 81%;
  margin: 5px 0 20px 0;
`
const TitleSection = Styled.h2`
  color: white;
  font-size: 1.6em;
  margin-bottom: 16px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  @media(max-width: 900px) {
    margin-left: 18px;
    margin-bottom: 23px;
  }

  @media(max-width: 545px) {
    font-size: 1.4em;
  }
`
const MusicListWrapper = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 75vw;
  height: 260px;
  overflow-y: hidden;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 0;
  } 
`
const Playlists = Styled.section`
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1;
  width: 500px;
  height: 45px;
  margin: 2.5px 0;
  border-radius: 7px;

  :hover{
    cursor: pointer;
    background-color: rgb(255 255 255 / 2%);
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
  margin: 0 auto;

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
  width: 60px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  @media(max-width: 545px) {
    display: none;
  }
`

const BoxIcon = Styled.img`
  padding: 0 10px;
  filter: invert(50%);
`


interface QuickPicksProps {
  data: {
    items:Array<PlaylistProps>;
  };
}

interface Playing {
  id:string;
}

const BoxQuickPicks: React.FC<QuickPicksProps> = ({ data }) => {

  const { prop, load } = usePlayer();
  const { isPlayingIndex, playlistInfor } = usePlaylistContext();
  const router = useRouter();

  const startList = (playlist: PlaylistProps): void => {
    if (playlist.id != playlistInfor.playlistId) {
      load({ playlist });
    }
  }

  const goToList = (id: string) => {
    router.push(`/playlist/${id}`);
  };

  //Component:
  const BoxPLayingNow: React.FC<Playing> = ({ id }) => {

    let status = {
      Playing: {
        src: istatic.animatedSvgUrl({ name: "playing" }),
        alt: "playingNow"
      },
      notPlaying: {
        src: istatic.iconUrl({ name: "play_arrow", color: "black" }),
        alt: "iconPlay"
      },
      Paused: {
        src: istatic.animatedSvgUrl({ name: "pausedIcon" }),
        alt: "paused icon"
      }
    }

    const iconView = ({ src, alt }: {src: string, alt: string}) => {
        return <BoxIcon src={src} alt={alt}/>;
    }
    let match = id === playlistInfor.playlistId;
    if(!prop.playing && match) return iconView(status.Paused);

    return iconView(match ? status.Playing : status.notPlaying);
  }

  return (
    <ViewPort>
      <TitleSection>Quick Picks</TitleSection>
      <MusicListWrapper>
        {data.items.map((pl, i) => {
          let { startWith } = pl.infors;
          return (
            <Playlists
              onClick={(e) => {
                e.stopPropagation();
                startList(pl);
                goToList(pl.id);
              }}
              key={pl.id}
            >
              <BoxNumMusic>
                <NumMusic>{i + 1}.</NumMusic>
              </BoxNumMusic>
              <DataMusic>
                <BoxImgMusic src={istatic.baseUrl + pl.infors.img} alt="playlist image" />
                <Titles>
                  <MusicTitle>{pl.infors.title}</MusicTitle>
                  <NamesList>
                    {startWith && startWith.artists.map((artist, index) => {
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
              <BoxPLayingNow id={pl.id}/>
            </Playlists>
          )
        })}
      </MusicListWrapper>
    </ViewPort>
  )
}

export default BoxQuickPicks;
