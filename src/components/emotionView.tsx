import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { Music } from 'common/types';
import { formatValues } from 'common/scripts/formatNum';
import { istatic } from 'api/istatic';
import { useSwiperSlide, useSwiper } from 'swiper/react';

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
const Infors = Styled.section`
	display: flex;
	flex-direction: column;
	width: 400px;
	height: 80%;
	padding: 20% 0;
	background-color: #01040E;
`
const MediaTitle = Styled.h2`
	color: #fff;
	margin: 15px 30px;
	padding: 10px 14px;
	border-left: 2px solid blue;
`
const UserData = Styled.section`
	display: flex;
	align-items: center;
	width: 100%;
`
const UserImg = Styled.img`
	width: 50px;
	margin: 0 15px 0 25px;
	border-radius: 50%;
`
const UserName = Styled.section`
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  width: 170px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const FollowBtn = Styled.button`
	border: 1px solid #fff;
	border-radius: 16px;
	color: #fff;
	font-size: 1em;
	background-color: transparent;
	padding: 5px 12px;
	margin: 0 20px;
	cursor: pointer;
`
const MediaData = Styled.section`
	display: flex;
	opacity: 0.8;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 50px;
`
const Count = Styled.p`
	${(props: {margin?: string, size?: string, opacity?: number}) => (`
		margin: ${props.margin};
		font-size: ${props.size};
		opacity: ${props.opacity};
	`)}
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
const SwiperUpBtn = Styled(Action)`
	width: 110%;
	transform: rotate(180deg);
	margin: 8px 0;
`
const SwiperDownBtn = Styled(Action)`
	width: 110%;
	margin: 8px 0;
`

interface EmotionViewProps {
	src: Music;
}

const EmotionView: React.FC<EmotionViewProps> = ({ src }) => {
	const swiperSlide = useSwiperSlide();
	const swiper = useSwiper();
	const [playing, setPlaying] = useState(false);

	useEffect(()=>{
		setPlaying(swiperSlide.isActive);
	},[swiperSlide.isActive])

	return (
	  <SectionWrapper>
	  	<Infors>
	  		<MediaTitle>{src.title}</MediaTitle>
	  		<UserData>
	  			<UserImg src={src.sourceBy.thumbnails[1].url} alt='user image'/>
	  			<section>
	  				<UserName>{src.sourceBy.name}</UserName>
		  			{src.sourceBy.subscriber_count &&
		  				<Count
		  					margin={'5px 0 0 0'}
		  					size={'0.9em'}
		  					opacity={0.8}
		  				>
		  					{formatValues(src.sourceBy.subscriber_count)} followes
		  				</Count>
		  			}
	  			</section>
	  			<FollowBtn>Follow</FollowBtn>
	  		</UserData>
	  		<MediaData>
	  			<Count margin={'0 30px'}>{formatValues(0)} comments</Count>
	  			<Count margin={'0 30px'}>{formatValues(src.viewCount)} views</Count>
	  		</MediaData>
	  	</Infors>
	    <PlayerWrapper>
	      <VideoPlayer
	        onClick={()=> setPlaying(playing=> !playing)}
	        playing={playing}
	        onPlay={()=> setPlaying(true)}
          onPause={()=> setPlaying(false)}
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
	    <SwiperUpBtn onClick={()=> swiper.slidePrev()} src={istatic.expand_more_white()} alt='share' />
	      <Action src={istatic.favorite_border_white()} alt='like' />
	      <Action src={istatic.iconShare()} alt='share' />
	      <SwiperDownBtn onClick={()=> swiper.slideNext()} src={istatic.expand_more_white()} alt='share' />
	    </Actions>
	  </SectionWrapper>
	);
};

export default EmotionView;