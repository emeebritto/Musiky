import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import { Music } from 'common/types';
import { formatValues } from 'common/scripts/formatNum';
import istatic from 'services/istatic';
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
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	width: 400px;
	height: 88%;
	padding-top: 8vh;
	background-color: #01040C;
	overflow: hidden;
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
	border-radius: 50%;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || '0 15px 0 25px'};
		width: ${props.size || "50px"};
		height: ${props.size || "50px"};
	`)}
`
const UserName = Styled.section`
  ${(props: {width?: string, bold?: boolean, opacity?: number}) => (`
  	width: ${props.width ? props.width : "170px"};
  	opacity: ${props.opacity ? props.opacity : 1};
  	${props.bold ? "font-weight: bold;" : ""}
  `)};
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
	margin: 0 35px;
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
const InputCommentsField = Styled.section`
	display: flex;
	align-items: center;
`
const InputComment = Styled.textarea`
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: #010512;
	padding: 10px 10px;
	resize: none;
	width: 64%;
	height: 30px;
	max-height: 80px;
	transition: 400ms;

	:focus {
		outline: 2px solid #012A7B;
		height: 50px;
	}
`
const Icon = Styled.img`
	opacity: .9;
	padding: 5px;
	cursor: pointer;
	${(props: {margin?: string, size: string}) => (`
		margin: ${props.margin || 0};
		width: ${props.size? props.size : "30px"};
	`)}
`
const Hr = Styled.hr`
	width: 100%;
	opacity: .05;
`
const CommentsWrapper = Styled.section`
	height: 320px;
	overflow-y: scroll;
`
const NoComments = Styled.p`
	opacity: .7;
	margin: 10px 20px;
`
const Comment = Styled.section`
	display: flex;
	width: 100%;
	margin: 16px 0;
`
const AboutCommentWrapper = Styled.section`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`
const CommentText = Styled.p`
	color: #fff;
	width: 18em;
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
  opacity: 0.9;
`
const SwiperUpBtn = Styled(Action)`
	width: 110%;
	transform: rotate(180deg);
	margin: 8px 0;
	${(props: {on: boolean}) => (`
		opacity: ${props.on ? 1 : 0.3};
	`)}
`
const SwiperDownBtn = Styled(Action)`
	width: 110%;
	margin: 8px 0;
	${(props: {on: boolean}) => (`
		opacity: ${props.on ? 1 : 0.3};
	`)}
`

interface EmotionViewProps {
	src: Music;
}

const EmotionView: React.FC<EmotionViewProps> = ({ src }) => {
	const swiperSlide = useSwiperSlide();
	const swiper = useSwiper();
	const [playing, setPlaying] = useState(false);
	const [comments, setComments] = useState(src.comments? src.comments.list:null);
	const [continuation, setContinuation] = useState(src.comments? src.comments.continuation:null);

	useEffect(()=> {
		setPlaying(swiperSlide.isActive);
	},[swiperSlide.isActive]);

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
		  					margin='5px 0 0 0'
		  					size='0.9em'
		  					opacity={0.8}
		  				>
		  					{formatValues(src.sourceBy.subscriber_count)} followes
		  				</Count>
		  			}
	  			</section>
	  			<FollowBtn>Follow</FollowBtn>
	  		</UserData>
	  		<MediaData>
	  			<Count margin='0 30px'>
	  				{formatValues(!!comments? comments.length : 0)} comments
	  			</Count>
	  			<Count margin='0 30px'>
	  				{formatValues(src.viewCount)} views
	  			</Count>
	  		</MediaData>
	  		<Hr/>
		  	<InputCommentsField>
		  		<UserImg size='40px' src={istatic.profileImg(null)} alt='user image'/>
		  		<InputComment placeholder='comment..'/>
		  		<Icon
		  			size='28px'
		  			margin='0 5px'
		  			src={istatic.iconUrl({ name: "send" })}
		  			alt='send comment'
		  		/>
		  	</InputCommentsField>
		  	<Hr/>
		  	<CommentsWrapper
		  		onMouseEnter={() => swiper.disable()}
		  		onMouseLeave={() => swiper.enable()}
		  	>
		  		{!comments && <NoComments>No comments</NoComments>}
		  		{!!comments && comments.map((cmm, i) => {
		  			return (
		  				<Comment>
		  					<UserImg size='40px' src={cmm.authorThumb[1].url} alt='user image'/>
		  					<section>
		  						<AboutCommentWrapper>
		  							<UserName opacity={0.8} width='190px' bold>{cmm.author}</UserName>
		  							<Count size='0.9em' margin='0 0' opacity={0.7}>{cmm.time}</Count>
		  						</AboutCommentWrapper>
		  						<CommentText>{cmm.text}</CommentText>
		  					</section>
		  				</Comment>
		  			);
		  		})}
		  	</CommentsWrapper>
	  	</Infors>
	    <PlayerWrapper>
	      <VideoPlayer
	        onClick={()=> setPlaying(playing=> !playing)}
	        playing={playing}
	        onPlay={()=> setPlaying(true)}
          onPause={()=> setPlaying(false)}
	        volume={1}
	        loop={true}
	        url={`https://musiky-listen.herokuapp.com/${src.id}?videoMode=1&source=${src.target}`}
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
	    	<SwiperUpBtn
	    		onClick={()=> {if (!swiper.isBeginning) swiper.slidePrev()}}
	    		src={istatic.iconUrl({ name: "expand_more" })}
	    		alt='up'
	    		on={!swiper.isBeginning}
	    	/>
	      <Action
	      	src={istatic.iconUrl({ name: "favorite_border" })}
	      	alt='like'
	      />
	      <Action
	      	src={istatic.iconUrl({ name: "share" })}
	      	alt='share'
	      />
	      <SwiperDownBtn
	      	onClick={()=> {if (!swiper.isEnd) swiper.slideNext()}}
	      	src={istatic.iconUrl({ name: "expand_more" })}
	      	alt='down'
	      	on={!swiper.isEnd}
	      />
	    </Actions>
	  </SectionWrapper>
	);
};

export default EmotionView;