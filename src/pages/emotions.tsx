import React, { useState, useEffect, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import Styled from "styled-components";
import cache from "memory-cache";
import faker from "faker";
import { useSplashContext } from 'common/contexts/splash';
import { usePlayer } from 'common/contexts/player';
import { TabTitle, EmotionView } from 'components';
import { Music } from 'common/types';
import { IstaticBaseUrl } from 'api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from "swiper";
import 'swiper/css';
import 'swiper/css/virtual';


const ViewPort = Styled.section`
  overflow-y: scroll;
  width: 100%;
  height: 100vh;

  .swiper {
    width: 100%;
    height: 100%;
  }
`
const LoadNewZone = Styled.section`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 40px;
  background-color: red;
`

const Emotions: NextPage = () => {

  const { desableSplash } = useSplashContext();
  const { stopPlayer } = usePlayer();
  const router = useRouter();
  const [emotionsList, setEmotionsList] = useState<Array<Music>>([]);
  const [page, setPage] = useState(1);

  let { startWith } = router.query;

  useEffect(()=>{
    stopPlayer()
  },[])

  useEffect(() => {
    async function getData() {
      let res = await axios.get(`${IstaticBaseUrl}emotions?page=${page}`)
          .then(r=>r.data)
          .catch(err => console.error(err));
      setEmotionsList((emotionsList: Array<Music>) => [...emotionsList, ...res]);
      console.log(emotionsList);
    };
    getData();
  },[page]);

  useEffect(()=>{
    async function getData() {
      if (startWith) {
        let first = await axios.get(`${IstaticBaseUrl}emotions?id=${startWith}`)
          .then(r => r.data)
          .catch(err => console.error(err));
        let someRandoms = await axios.get(`${IstaticBaseUrl}emotions?random=1&maxResult=5`)
          .then(r => r.data)
          .catch(err => console.error(err));
        setEmotionsList((emotionsList: Array<Music>) => [
          first,
          ...someRandoms,
          ...emotionsList
        ]);
      };
    };
    getData();
  },[router.query.startWith])

  if (true) desableSplash();

  return (
    <>
    <TabTitle name={`Musiky - Emotions`}/>
    <ViewPort>
      <Swiper
        slidesPerView={1}
        direction={"vertical"}
        modules={[Virtual]}
        onReachEnd={() => {setPage((currentValue) => currentValue + 1)}}
        virtual
      >
        {emotionsList.map((emotion, i) => {
          return (
            <SwiperSlide
              key={i + faker.datatype.uuid()}
              virtualIndex={i}
            >
              <EmotionView src={emotion}/>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </ViewPort>
    </>
  );
}

export default Emotions;
