import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { musiky } f.rom 'services';
import Link from 'next/link';
import Styled from "styled-components";
import { ArtistPageContent } from 'common/types/pages';
import { istatic } from "services";
import { formatValues } from 'helpers';
import { usePlayer } from 'contexts/player';
import { useSplashContext } from 'contexts/splash';
import { MusicList, TabTitle } from 'components';


const ViewPort = Styled.section`
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
`
const Wrapper = Styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  width: 100%;
  margin: 15vh 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`
const ArtistInfor = Styled.section`
  display: flex;
  align-items: center;
`
const ArtistImg = Styled.img`
  border-radius: 15%;
  width: 185px;
  height: 185px;
`
const ArtistData = Styled.section`
  margin: 0 30px;
`
const ArtistName = Styled.h1`
  color: #fff;
  height: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.7em;
`
const FollowesCounter = Styled.p`
  color: #7B7D83;
  height: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2em;
  margin: 10px 0 0 0;
`
const BrnFollow = Styled.button`
  border: none;
  background-color: rgb(0 0 0 /30%);
  border-radius: 16px;
  border: 1px solid #fff;
  cursor: pointer;
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.3em;
  padding: 5px 30px;
  transition: 300ms;

  :hover {
    background-color: #fff;
    color: black;
  }
`
const WrapperGenres = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  flex-wrap: wrap;
  margin: 30px 0;
`
const Genre = Styled.p`
  padding: 5px 10px;
  background-color: #181B20;
  border-radius: 10px;
  margin: 5px 10px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const Hr = Styled.hr`
  margin: 30px 0;
  width: 50%;
  opacity: 20%;
`
const Listen = Styled.section`
  display: flex;
`
const MusicListWrapper = Styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 40vw;
  height: auto;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 0;
  } 
`
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
    transform: translateY(-5px);
  }
  :hover #BtnPLayHover {
    display: inline-block;
  }

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
  border-radius: 10px;
  width: 150px;
  height: 150px;
`
const PlayListTitle = Styled.h1`
  color: white;
  height: 40px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2em;
  margin: 0px 0px 5px 5px;
`
const Description = Styled.p`
  color: white;
  color: rgb(255 255 255/ 65%);
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left: 5px;
`
const PlaylistWrapper = Styled.section`
  display: flex;
  flex-direction: column;
  width: 20vw;
  align-items: center;

  ::-webkit-scrollbar {
    width: 0;
  }   
`

interface ArtistPageProps {
  apiRes: ArtistPageContent;
}

const Artist: NextPage<ArtistPageProps> = ({ apiRes }) => {

  const { desableSplash } = useSplashContext();
  const { load } = usePlayer();

  const { artist, musics, playlists, requestId } = apiRes;

  const startList = async(playlistId: string): Promise<void> => {
    let playlist = await istatic.playlistData({ id: playlistId }).then(r => r.data);
    load({ playlist });
  }

  const startMedia = (playIndex: number): void => {
    load({ media: musics[playIndex] });
  };

  if (requestId) desableSplash();

  return (
    <>
    <TabTitle name={`Artist: ${artist.name}`}/>
    <ViewPort>
      <Wrapper>
        <ArtistInfor>
          <ArtistImg 
            src={artist.images.length 
              ? artist.images[1].url 
              : undefined} 
            alt='artist profile imagem'
          />
          <ArtistData>
            <ArtistName>{artist.name}</ArtistName>
            <FollowesCounter>
              { formatValues(artist.followers.total) } Followes
            </FollowesCounter>
          </ArtistData>
          <BrnFollow>Follow</BrnFollow>
        </ArtistInfor>
        <WrapperGenres>
          {artist.genres.map((genre, i)=>{
            return (
              <Genre key={i}>{genre}</Genre>
            )
          })}
        </WrapperGenres>
        <Hr/>
        <Listen>
          <MusicListWrapper>
            <MusicList
              list={musics}
              listId={requestId}
              startMedia={startMedia}
            />
          </MusicListWrapper>
          {playlists.length > 0 &&
          <PlaylistWrapper>
            {playlists.map((playList, index) => {
              return (
                <Link 
                  href={`/playlist/${playList.infors.playlistId}`}
                  key={index}>
                  <PlayList>
                    <PlayListImg 
                      id="PlayListImg" 
                      src={istatic.baseUrl + playList.infors.img}
                    />
                    <BtnPLayHover 
                      onClick={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        startList(playList.infors.playlistId)
                      }}
                      id="BtnPLayHover"
                    >
                      <BtnPLayHoverImg
                        src={istatic.iconUrl({ name: "play_arrow", color: "black" })}
                        alt="play icon"
                      />
                      <ShadowHover></ShadowHover>
                    </BtnPLayHover>
                    <section>
                      <PlayListTitle>{playList.infors.title}</PlayListTitle>
                      <Description>{playList.infors.length} Musics</Description>
                    </section>
                  </PlayList>
                </Link>
              )
            })}
          </PlaylistWrapper>}
        </Listen>
      </Wrapper>
    </ViewPort>
    </>
  )
}

export default Artist;

export const getServerSideProps: GetServerSideProps = async(context) => {
  let id = String(context?.params?.id || '');
  if(!id) return { notFound: true };
  let apiRes = await musiky.api.artist({ id })
    .then(r => r.data)
    .catch(err => console.error(err))

  if(!apiRes) return { notFound: true };

  return {
    props: { apiRes }, // will be passed to the page component as props
  }
}
