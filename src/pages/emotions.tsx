import React, { useState, useEffect, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import Styled from "styled-components";
import cache from "memory-cache";
import faker from "faker";
import { useSplashContext } from 'common/contexts/splash';
import { usePlayer } from 'common/contexts/player';
import { TabTitle, EmotionView } from 'components';
import { Music } from 'common/types';
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

interface EmotionsProps {
  emotions: Music[];
};
const Emotions: NextPage<EmotionsProps> = ({ emotions }) => {

  const { desableSplash } = useSplashContext();
  const { stopPlayer } = usePlayer();
  const [emotionsList, setEmotionsList] = useState<Music[]>(emotions);
  //const [page, setPage] = useState(1);

  const loadMore = async() => {
    let res = await axios.get(`${location.origin}/api/emotions?random=1&maxResult=8`)
      .then(r=>r.data)
      .catch(err => console.error(err));
    setEmotionsList((emotionsList: Array<Music>) => [...emotionsList, ...res]);
    //setPage((currentValue) => currentValue + 1);
  };

  useEffect(()=>{
    stopPlayer()
  },[])
  if (true) desableSplash();

  return (
    <>
    <TabTitle name={`Musiky - Emotions`}/>
    <ViewPort>
      <Swiper
        slidesPerView={1}
        direction={"vertical"}
        modules={[Virtual]}
        onReachEnd={loadMore}
        virtual
      >
        {emotionsList.map((emotion, i) => {
          return (
            <SwiperSlide
              key={i + faker.datatype.uuid()}
              virtualIndex={i}
            >
              <EmotionView src={emotion} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </ViewPort>
    </>
  );
}

export default Emotions;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const startWith: string | string[] | undefined = context?.query?.startWith;
  let firstEmotion: Music | null = null;
  const URL = `http://${context.req.headers.host}/api/emotions?id=${startWith}&random=1&maxResult=14`;
  let emotions = await axios.get(URL).then(r => r.data);
  return {
    props: { emotions }, // will be passed to the page component as props
  }
}
