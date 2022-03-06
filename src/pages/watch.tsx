import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import Styled from 'styled-components';
import { istatic } from 'api/istatic';
import { mediaDownload } from 'common/utils';
import { usePlayer, usePlayerProgress } from 'common/contexts/player';
import { useSplashContext } from 'common/contexts/splash';
import { PlayerProgressControl } from 'components';

const ViewPort = Styled.section`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #020309;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	z-index: 10;
	width: 96.2vw;
	min-height: 100vh;
	overflow: scroll;
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
	width: 50vw;
`
const MetaData = Styled.section`
	width: 75%;
	margin: 20px 0;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const MediaTitle = Styled.p`
	margin: 10px 0;
	font-weight: bold;
	font-size: 1.4em;
`
const ArtistName = Styled.p`
	opacity: 0.7;
	font-size: 1,1em;
`
const Actions = Styled.section`
	display: flex;
`
const Action = Styled.img`
	padding: 5px;
	margin: 0 8px;
	width: 28px;
	cursor: pointer;
`

const Watch: NextPage = () => {
  const router = useRouter();
  const { desableSplash } = useSplashContext();
  const [controlsVisible, setControlsVisible] = useState(false);
  const {
  	ref,
  	prop,
  	load,
  	setFullscreen,
  	toggleMuted,
  	handleVolumeChange,
  	changeVolumeTo,
  	changeMode,
  	nextMusic,
  	onBuffer,
  	onPlayAndPause
  } = usePlayer();
  const { changeCurrentTimeTo, currentTime } = usePlayerProgress();

  const fullscreenMode = () => {
  	let element = ref.watchPlayerWrapper.current;
  	let req = null;
   	const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);
    if (!isInFullScreen) {
	    req = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen;
	    req.call(element);
	    setFullscreen(true);
    } else {
	    req = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen;
	    req.call(document);
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
		changeMode({watch:true});
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
    		changeMode({only_audio:true});
    	}
    });
  },[])

	if (prop.music) desableSplash();
  if (!prop.music) return(<></>);

	return (
		<ViewPort>
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
		    <MetaData>
			    <MediaTitle contentEditable={true}>{prop.music.title}</MediaTitle>
			    <ArtistName>
			    	{prop.music.artists[0] || prop.music.sourceBy.name}
			    </ArtistName>
		    </MetaData>
		    <Actions>
		    	<Action src={istatic.favorite_border_white()} alt="I'm love it"/>
		    	<Action
		    		onClick={()=> mediaDownload(prop.music, {videoMode: 1})}
		    		src={istatic.downloadIcon()}
		    		alt="download"
		    	/>
		    	<Action src={istatic.iconShare()} alt="share"/>
		    </Actions>
	    </AboutContent>
	  </Media>
		</ViewPort>
	);
}

export default Watch;
