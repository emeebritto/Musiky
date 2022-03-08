import React, { useState, useEffect, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import Styled from 'styled-components';
import { istatic } from 'api/istatic';
import { mediaDownload } from 'common/utils';
import { PlayerMode } from 'common/types';
import { usePlayer, usePlayerProgress } from 'common/contexts/player';
import { useSplashContext } from 'common/contexts/splash';
import { PlayerProgressControl } from 'components';

const ViewPort = Styled.section`
	overflow-y: scroll;
	display: flex;
	justify-content: center;
	background-color: #020309;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	width: 96.4vw;
	height: 100vh;
`
const Wrapper = Styled.section`
	margin-top: 12vh;
	z-index: 10;
`
const Hr = Styled.hr`
	opacity: .05;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || 0};
		width: ${props.size? props.size : "100%"};
	`)}
`
const Media = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const PlayerWrapper = Styled.section`
  position: relative;
  border-radius: 10px;
  width: 55.4vw;
  height: 65vh;
  overflow: hidden;
`
const VideoPlayer = Styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`
const Controls = Styled.section`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	box-shadow: inset 0 -80px 90px #000;
	transition: 400ms;
	opacity: ${(props: {active: boolean}) => (
		props.active ? "1" : "0"
	)};
`
const VolumeWrapper = Styled.section`
	position: absolute;
	top: 44%;
	right: 3%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 40px;
`
export const VolumeControl = Styled.input`
  -webkit-appearance: none;
  border-radius: 8px;
  width: 130px;
  height: 4px;
  outline: none;
  cursor: pointer;
  transform: rotate(-90deg);
  padding: 6px 0;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 40px #000;

  ::-webkit-slider-thumb{
    height: 12px;
    width: 12px;
    top: 0px;
  }
`
export const BtnIconVolume = Styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 80px 0 0 0;
`
const ProgressWrapper = Styled.section`
	position: relative;
	width: 80%;
	height: 18%;
	margin: 30px 0;
`
const AboutContent = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 53vw;
	margin: 20px 0;
`
const ArtistsProfile = Styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin: 0 15px 0 0;
`
const MetaData = Styled.section`
	width: 75%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const MediaTitle = Styled.p`
	margin: 0 0 10px 0;
	font-weight: bold;
	font-size: 1.4em;
`
const ArtistName = Styled.p`
	opacity: 0.7;
	font-size: 1em;
	cursor: pointer;
`
const Actions = Styled.section`
	display: flex;
`
const ActionWrapper = Styled.section`
	margin: 5px 15px 0 0;
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 7px;
	transition: 400ms;
	:hover {
		background-color: rgba(255, 255, 255, 0.05)
	}
`
const Action = Styled.img`
	padding: 5px;
	cursor: pointer;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || '0 8px'};
		width: ${props.size || "28px"};
	`)}
`
const InputCommentsField = Styled.section`
	display: flex;
	align-items: center;
`
const UserImg = Styled.img`
	border-radius: 50%;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || '0 15px 0 25px'};
		width: ${props.size || "50px"};
		height: ${props.size || "50px"};
	`)}
`
const CommentData = Styled.section`
	width: 80%;
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
const Count = Styled.p`
	${(props: {margin?: string, size?: string, opacity?: number}) => (`
		margin: ${props.margin};
		font-size: ${props.size};
		opacity: ${props.opacity};
	`)}
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
const InputComment = Styled.textarea`
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: #010512;
	padding: 10px 10px;
	resize: none;
	width: 45vw;
	height: 30px;
	max-height: 80px;
	transition: 400ms;

	:focus {
		outline: 2px solid #012A7B;
		height: 50px;
	}
`
const CommentsWrapper = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 50vw;
`
const NoComments = Styled.p`
	opacity: .7;
	margin: 10px 20px;
`
const Comment = Styled.section`
	display: flex;
	width: 100%;
	margin: 15px 0;
`
const AboutCommentUser = Styled.section`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`
const CommentText = Styled.p`
	color: #fff;
	width: 25em;
	overflow: hidden;
`
const LoadNewZone = Styled.img`
  width: 40px;
  height: 40px;
  margin: 20px 0;
`

const Watch: NextPage = () => {
  const router = useRouter();
  const { desableSplash } = useSplashContext();
  const [controlsVisible, setControlsVisible] = useState(false);
  const [comments, setComments] = useState<any>([]); // TEMP
  const [continuation, setContinuation] = useState<null | string>(null);
  const [snippetComments, setSnippetComments] = useState(0);
  const zoneRef = useRef<HTMLImageElement | null>(null);
  const {
  	ref,
  	prop,
  	load,
  	setFullscreen,
  	toggleMuted,
  	changeVolumeTo,
  	changeMode,
  	nextMusic,
  	onBuffer,
  	onPlayAndPause
  } = usePlayer();
  const { changeCurrentTimeTo, currentTime } = usePlayerProgress();

  const fullscreenMode = () => {
  	let element = ref.watchPlayerWrapper.current;
  	const doc: any = document;
  	let req = null;
   	const isInFullScreen = (doc.fullscreenElement && doc.fullscreenElement !== null) ||
      (doc.webkitFullscreenElement && doc.webkitFullscreenElement !== null) ||
      (doc.mozFullScreenElement && doc.mozFullScreenElement !== null) ||
      (doc.msFullscreenElement && doc.msFullscreenElement !== null);
    if (!isInFullScreen) {
	    req = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen;
	    req.call(element);
	    setFullscreen(true);
    } else {
	    req = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen;
	    req.call(doc);
	    setFullscreen(false);
    }
  };

  function getVolumeIconStatus() {
    if(prop.muted) return istatic.iconVolumeOff()
    if(prop.volume < 0.4) return istatic.iconVolumeDown()
    return istatic.iconVolume()
  }

  const init = async() => {
		if (!prop.music) {
			const music = await axios.get(`${IstaticBaseUrl}music/${router.query.v}`)
				.then(r => r.data)
			load({ media: music });
		}
		changeMode({ ...prop.mode, only_audio: false, watch:true });
  };

  useEffect(()=> {
  	if (!router.query.v) return;
  	init();
  }, [router.query.v])

 	useEffect(()=> {
 	  if (!ref.watchPlayer.current) return;
	 	ref.watchPlayer.current.seekTo(currentTime);
 	},[ref.watchPlayer.current])

  useEffect(()=>{
    router.events.on("routeChangeComplete", (url: string): void => {
    	if (!url.includes('/watch')) {
    		changeMode({ ...prop.mode, only_audio:true, watch:false });
    	}
    });
  },[])

  useEffect(()=>{
  	setSnippetComments(0);
  	setContinuation('');
  	setComments([]);
  },[prop.music]);

 useEffect(() => {
  async function getData() {
  	if (snippetComments > 1 && !continuation) return;

  	const musicId = prop.music ? prop.music.id : null;
  	const continuationQuery = continuation? `&continuation=${continuation}`: '';
  	const URL_PATH = `comments?id=${musicId}${continuationQuery}`;

    let resComments = await axios.get(`${IstaticBaseUrl + URL_PATH}`)
      .then(r=>r.data)
      .catch(err => console.error(err));
    setComments((currentValue: any) => [...currentValue, ...resComments.comments]);
    setContinuation(resComments.continuation);
  }
  if (snippetComments) getData();
},[snippetComments]);

  useEffect(() => {
    const node = zoneRef?.current; // kDOM Ref
    if (!node) return;
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setSnippetComments((currentValue: number) => currentValue + 1);
      }
    })
    intersectionObserver.observe(node);
    return () => intersectionObserver.disconnect();
  }, [zoneRef]);

	if (prop.music) desableSplash();
  if (!prop.music) return(<></>);

	return (
		<ViewPort>
		<Wrapper>
			<Media>
				<PlayerWrapper
					ref={(wrapper: HTMLDivElement) => ref.watchPlayerWrapper.current = wrapper}
		  		onMouseEnter={()=> setControlsVisible(true)}
		  		onMouseLeave={()=> setControlsVisible(false)}
				>
		      <VideoPlayer
		      	ref={(reactPlayer: HTMLDivElement) => ref.watchPlayer.current = reactPlayer}
		        playing={prop.playing}
		        volume={prop.volume}
		        loop={prop.loop}
		        //onDuration={(duration: number) => ()}
		        onBuffer={()=> onBuffer(true)}
		        onBufferEnd={()=> onBuffer(false)}
		        onEnded={()=> nextMusic(1)}
		        //onError={(e) => console.log(e)}
	          onProgress={(time: {played: number, playedSeconds: number}) => {
	            if (!prop.seeking) {
	              changeCurrentTimeTo(time.played, time.playedSeconds);
	            }
	          }}
		        url={`https://musiky-listen.herokuapp.com/${prop.music.id}?videoMode=1&source=yt`}
		        width='100%'
		        height='100%'
		        config={{
		          file: {
		            attributes: { autoPlay: 0, controls: 0 },
		          }
		        }}
		      />
		      <Controls
		      	onClick={()=> onPlayAndPause()}
		      	active={controlsVisible || !prop.playing || prop.buffer}
		      >
		      	<VolumeWrapper onClick={e=> e.stopPropagation()}>
			        <VolumeControl 
			          type='range'
			          min={0} 
			          max={1} 
			          step='any'
			          value={prop.volume}
			          onChange={(e: React.SyntheticEvent<EventTarget>): void => {
							    let target = e.target as HTMLInputElement;
							    changeVolumeTo(parseFloat(target.value));
							  }}
			        />
			        <BtnIconVolume onClick={()=> toggleMuted()}>
			          <img src={getVolumeIconStatus()} alt="Volume Icon"/>
			        </BtnIconVolume>
		      	</VolumeWrapper>
		      	<ProgressWrapper>
		      		<PlayerProgressControl
		      			includes={{loop:true, fullscreen:true}}
		      			onRequestFullscreen={fullscreenMode}
		      		/>
		      	</ProgressWrapper>
		      </Controls>
		    </PlayerWrapper>
		    <AboutContent>
		    	<ArtistsProfile
		    		src={prop.music.snippetArtistsData[0]
		    			? prop.music.snippetArtistsData[0].images[1].url
		    			: prop.music.sourceBy.thumbnails[1].url
		    		}
		    		alt='artist profile image'
		    	/>
			    <MetaData>
				    <MediaTitle contentEditable={true}>{prop.music.title}</MediaTitle>
				    <ArtistName>
				    	{prop.music.artists[0] || prop.music.sourceBy.name}
				    </ArtistName>
			    </MetaData>
			    <Actions>
			    	<Action src={istatic.favorite_border_white()} alt="I'm love it"/>
			    	<Action
			    		onClick={()=> {
			    			if (!prop.music) return;
			    			mediaDownload(prop.music, {videoMode: 1})
			    		}}
			    		src={istatic.downloadIcon()}
			    		alt="download"
			    	/>
			    	<Action src={istatic.iconShare()} alt="share"/>
			    </Actions>
		    </AboutContent>
		    <Hr margin='20px 0'/>
		    <InputCommentsField>
		  		<UserImg size='44px' src={istatic.userImg()} alt='user image'/>
		  		<InputComment placeholder='comment..'/>
		  		<Icon
		  			size='28px'
		  			margin='0 10px'
		  			src={istatic.send_white()}
		  			alt='send comment'
		  		/>
			  </InputCommentsField>
		  	<CommentsWrapper>
		  		{!comments && <NoComments>No comments</NoComments>}
		  		{!!comments && comments.map((cmm: any, i: number) => {
		  			return (
		  				<Comment>
		  					<UserImg size='40px' src={cmm.authorThumb[1].url} alt='user image'/>
		  					<CommentData>
		  						<AboutCommentUser>
		  							<UserName opacity={0.8} width='190px' bold>{cmm.author}</UserName>
		  							<Count size='0.9em' margin='0 0' opacity={0.7}>{cmm.time}</Count>
		  						</AboutCommentUser>
		  						<CommentText>{cmm.text.replace(/<br>/ig, '\n')}</CommentText>
		  						<Actions>
		  							<ActionWrapper>
								    	<Action
								    		size='25px'
								    		margin='0'
								    		src={istatic.favorite_border_white()}
								    		alt="I'm love it"
								    	/>
								    	<Count size='0.93em' margin='0 8px' opacity={0.7}>{cmm.likes}</Count>
		  							</ActionWrapper>
		  							<ActionWrapper>
								    	<Action
								    		size='25px'
								    		margin='0'
								    		src={istatic.chat_bubble_outline_white()}
								    		alt="replies"
								    	/>
								    	<Count size='0.93em' margin='0 8px' opacity={0.7}>{cmm.numReplies}</Count>
							    	</ActionWrapper>
							    </Actions>
		  					</CommentData>
		  				</Comment>
		  			);
		  		})}
		  		<LoadNewZone ref={zoneRef} src={istatic.loading_jump()} alt='loading comments'/>
		  	</CommentsWrapper>
		  </Media>
	  </Wrapper>
		</ViewPort>
	);
}

export default Watch;
