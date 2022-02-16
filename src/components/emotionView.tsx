import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { Music } from 'common/types';
import { istatic } from 'api/istatic';
import { useSwiperSlide } from 'swiper/react';

const SectionWrapper = Styled.section`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99.5%;
  height: 100vh;
  margin: 0 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`
const PlayerWrapper = Styled.section`
  border-radius: 10px;
  position: relative;
  width: 27vw;
  height: 100vh;
  overflow: hidden;
`
const VideoPlayer = Styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`
const Actions = Styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 35px;
  margin: 0 30px;
`
const Action = Styled.img`
  border: 0px solid #48484A;
  border-radius: 50%;
  padding: 10px;
  width: 90%;
  margin: 8px 0;
  cursor: pointer;
  opacity: 0.8;

  :hover {
    opacity: 1;
  }
`

interface EmotionViewProps {
	src: Music;
}

const EmotionView: React.FC<EmotionViewProps> = ({ src }) => {
	const swiperSlide = useSwiperSlide();
	const [playing, setPlaying] = useState(false);

	useEffect(()=>{
		setPlaying(swiperSlide.isActive);
	},[swiperSlide.isActive])

	return (
	  <SectionWrapper>
	    <PlayerWrapper>
	      <VideoPlayer
	        onClick={()=> setPlaying(playing=> !playing)}
	        playing={playing}
	        volume={1}
	        loop={true}
	        url={`https://musiky-listen.herokuapp.com/${src.id}?videoMode=1`}
	        width='100%'
	        height='100%'
	        config={{
	          file: {
	            attributes: { autoPlay: 0, controls: 0 },
	          }
	        }}
	      />
	    </PlayerWrapper>
	    <Actions>
	      <Action src={istatic.favorite_border_white()} alt='like' />
	      <Action src={istatic.iconShare()} alt='share' />
	    </Actions>
	  </SectionWrapper>
	);
};

export default EmotionView;