import React from 'react';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import faker from 'faker';
import { Music } from 'common/types';
import { SwiperSlide } from 'swiper/react';
import { istatic } from 'api/istatic';
import {
  VerticalView,
  EmotionPreviewBox,
  LastPlayed,
  SwiperBtns
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
const VerticalViewStyle = () => (`
  position: relative;
  align-items: flex-start;
  border-radius: 8px;
  overflow: hidden;
  background-color: #090816;
`)
const MyFlow = Styled.section`
  width: 30vw;
  height: 365px;
`

const ComingSoon = Styled.p`
  margin: 140px;
`

interface YourFlowProps {
  data: {
    emotions: Music[];
  }
}

const YourFlow: React.FC<YourFlowProps> = ({ data }) => {
  const router = useRouter();
  return (
    <ViewPort>
      <EmotionsAndResume>
        <VerticalView
          viewLabel='Emotions'
          slidesPerView={4}
          addStyle={VerticalViewStyle()}
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
          viewLabel='Last Played:'
          addStyle={VerticalViewStyle()}
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
      <VerticalView
        viewLabel='MyFlow'
        addStyle={VerticalViewStyle()}
        width='38.5%'
        desableSwipeMode
      >
        <MyFlow>
          <ComingSoon>Coming Soon.</ComingSoon>
        </MyFlow>
      </VerticalView>
    </ViewPort>
  );
}

export default YourFlow;