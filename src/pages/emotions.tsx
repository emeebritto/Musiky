import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { musiky } from 'services';
import Styled from "styled-components";
import faker from "faker";
import { useSplashContext } from 'contexts/splash';
import { usePlayer } from 'contexts/player';
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
  emotions:Music[];
};
const Emotions: NextPage<EmotionsProps> = ({ emotions }) => {

  const { desableSplash } = useSplashContext();
  const { stopPlayer } = usePlayer();
  const [emotionsList, setEmotionsList] = useState<Music[]>(emotions);

  const loadMore = async() => {
    await musiky.api.emotions({ random: 1, maxResult: 8 })
      .then(r => {
        const res = r.data;
        setEmotionsList((emotionsList: Array<Music>) => [...emotionsList, ...res]);
      }).catch(console.error);
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
  const startWith = String(context?.query?.startWith || '');
  let emotions = await musiky.api.emotions({ id: startWith, random: 1, maxResult: 8 })
    .then(r => r.data);

  return {
    props: { emotions }, // will be passed to the page component as props
  }
}
