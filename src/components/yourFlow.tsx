import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import faker from 'faker';
import { Music } from 'common/types';
import { SwiperSlide } from 'swiper/react';
import {
  VerticalView,
  EmotionPreviewBox,
  LastPlayed,
  SwiperBtns,
  MyFlow
} from 'components';


const ViewPort = Styled.section`
  display: flex;
  justify-content: space-between;
  width: 81%;
  margin: 20px 0 10px 0;
`
const EmotionsAndResume = Styled.section`
  width: 60%;
`

interface YourFlowProps {
  data: {
    emotions: Music[];
  }
}

const YourFlow: React.FC<YourFlowProps> = ({ data }) => {
  const router = useRouter();
    const [screenWidth, setScreenWidth] = useState(0)

  useEffect(()=>{
    const win: any = window;
    setScreenWidth(win.innerWidth)
    if(win.attachEvent) {
      win.attachEvent('onresize', function() {
        setScreenWidth(win.innerWidth)
      });
    }
    else if(win.addEventListener) {
      win.addEventListener('resize', function() {
        setScreenWidth(win.innerWidth)
      }, true);
    }

    return ()=> {
      if(win.detachEvent) {
        win.detachEvent('onresize', function() {
          setScreenWidth(win.innerWidth)
        })
      }
      else if(win.removeEventListener) {
        win.removeEventListener('resize', function() {
          setScreenWidth(win.innerWidth)
        }, true)
      }
    }
  },[])


  const VerticalViewStyle = `
    position: relative;
    align-items: flex-start;
    border-radius: 8px;
    overflow: hidden;
    background-color: #090816;
  `;


  return (
    <ViewPort>
      <EmotionsAndResume>
        <VerticalView
          viewLabel='Emotions'
          slidesPerView={(4.5 * screenWidth) / 1600}
          addStyle={VerticalViewStyle}
        >
          {data.emotions.map((item, i) => {
            return (
              <SwiperSlide
                onClick={()=> router.push(`/emotions?startWith=${item.id}`)}
                key={i + faker.datatype.uuid()}
              >
                <EmotionPreviewBox source={item}/>
              </SwiperSlide>
            );
          })}
          <SwiperBtns/>
        </VerticalView>
        <VerticalView
          viewLabel='Played'
          addStyle={VerticalViewStyle}
          labelSize='1.5em'
          btnOption={{
            displayName: "History",
            href: '/history'
          }}
          desableSwipeMode
          desableLine
        >
          <LastPlayed/>
        </VerticalView>
      </EmotionsAndResume>
      <MyFlow/>
    </ViewPort>
  );
}

export default YourFlow;
