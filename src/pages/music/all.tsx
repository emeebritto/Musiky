import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Styled from "styled-components";
import { Music } from 'common/types';
import { MusicList, TabTitle } from 'components';
import { useSplashContext } from 'contexts/splash';
import { usePlayer } from 'contexts/player';
import { istatic } from 'services';


const ViewPort = Styled.section`
  overflow-y: scroll;
  width: 96.33vw;
  height: 100vh;
`
const Wrapper = Styled.section`
  display: flex;
  margin: 14vh 0;
`
const MusicListWrapper = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  width: 50vw;
  height: auto;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 0;
  } 
`
const LoadNewZone = Styled.section`
  width: 40px;
  height: 40px;
`

const AllMusics: NextPage = () => {

  const { desableSplash } = useSplashContext();
  const { load } = usePlayer();
  const [musicList, setMusicList] = useState<Array<Music>>([]);
  const [secondColumn, setSecondColumn] = useState<Array<Music>>([]);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement | null>(null);

  let id = 'allCol100';
  let secondId = 'allCol200';

  const startMedia1col = (playIndex:number): void => {
    load({ media: musicList[playIndex] });
  };
  const startMedia2col = (playIndex:number): void => {
    load({ media: secondColumn[playIndex] });
  };

  useEffect(() => {
    async function getData(): Promise<void> {
      let musics = await istatic.musicsData({ page })
        .then(r => r.data)
        .catch(err => console.error(err));
      if (!musics || !musics.length) return;
      let firstPoint:number = musics.length / 2;
      let endPoint:number = musics.length;

      let newList:Music[] = [...musics].splice(0, firstPoint);
      let newSecondColumn:Music[] = [...musics].splice(firstPoint, endPoint);

      setMusicList((musicList: Array<Music>) => [...musicList, ...newList]);
      setSecondColumn((secondColumn: Array<Music>) => [...secondColumn, ...newSecondColumn]);
    }
    getData();
  },[page]);

  useEffect(() => {
    const node = ref?.current // DOM Ref
    if (!node) return
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setPage((currentValue) => currentValue + 1);
      }
    })
    intersectionObserver.observe(node);
    return () => intersectionObserver.disconnect();
  }, []);

  if (!!musicList.length) desableSplash();


  return (
    <>
    <TabTitle name={`Musiky - All Tracks`}/>
    <ViewPort>
      <Wrapper>
        <MusicListWrapper>
          <MusicList
            list={musicList}
            listId={id}
            startMedia={startMedia1col}
          />
        </MusicListWrapper>
        <MusicListWrapper>
          <MusicList
            list={secondColumn}
            listId={secondId}
            startMedia={startMedia2col}
          />
        </MusicListWrapper>
      </Wrapper>
      <LoadNewZone ref={ref}/>
    </ViewPort>
    </>
  )
}

export default AllMusics;
