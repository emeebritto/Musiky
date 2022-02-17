import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import type { NextPage, GetServerSideProps } from 'next';
import Styled from "styled-components";
import cache from "memory-cache";
import faker from "faker";
import { useSplashContext } from 'common/contexts/splash';
import { TabTitle, EmotionView } from 'components';
import { Music } from 'common/types';
import { IstaticBaseUrl } from 'api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Virtual } from "swiper";
import 'swiper/css';
import 'swiper/css/scrollbar';
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
  const [emotionsList, setEmotionsList] = useState<Array<Music>>([]);
  const [page, setPage] = useState(1);
  const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      async function getData() {
        let res = await axios.get(`${IstaticBaseUrl}emotions?page=${page}`)
            .then(r=>r.data)
            .catch(err => console.error(err));

        setEmotionsList((emotionsList: Array<Music>) => [...emotionsList, ...res]);
      }
      getData()
    },[page]);

  if (true) desableSplash();

  return (
    <>
    <TabTitle name={`Musiky - Emotions`}/>
    <ViewPort>
      <Swiper
        slidesPerView={1}
        direction={"vertical"}
        scrollbar={{ draggable: true }}
        modules={[Scrollbar, Virtual]}
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

//<Action src={istatic.chat_bubble_outline_white()} alt='comment' />
//{i === (emotionsList.length - 5) && <LoadNewZone ref={ref}/>}