import React, { useState, useEffect } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import Styled from 'styled-components';
import { istatic } from 'api/istatic';
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
	box-shadow: inset 0 -50px 90px #000;
	transition: 400ms;
	opacity: ${(props: {active: boolean}) => (
		props.active ? "1" : "0"
	)};
`
const ProgressWrapper = Styled.section`
	width: 80%;
	height: 15%;
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
  	desableAudioPlayer,
  	nextMusic,
  	onBuffer,
  	onPlayAndPause
  } = usePlayer();
  const { changeCurrentTimeTo, currentTime } = usePlayerProgress();

  const init = async() => {
		if (!prop.music) {
			const music = await axios.get(`${IstaticBaseUrl}music/${router.query.v}`)
				.then(r => r.data)
			load({
				playIndex: 0,
				list: [ music ],
				listId: 'watch-sdr5h742ng'
			});
		}
		desableAudioPlayer();
  };

  useEffect(()=> {
  	if (!router.query.v) return;
  	init();
  }, [router.query.v])

 	//useEffect(()=> {
 	//  if (!ref.watchPlayer.current) return;
	// 	ref.watchPlayer.current.seekTo(currentTime);
 	//},[ref.watchPlayer.current])

  useEffect(()=>{
    router.events.on("routeChangeComplete", (url: string): void => {
    	if (!url.includes('/watch')) {
    		desableAudioPlayer(false);
    	}
    });
  },[])

	if (prop.music) desableSplash();
  if (!prop.music) return(<></>);

	return (
		<ViewPort>
		<Media>
			<PlayerWrapper
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
	      	<ProgressWrapper>
	      		<PlayerProgressControl/>
	      	</ProgressWrapper>
	      </Controls>
	    </PlayerWrapper>
	    <AboutContent>
		    <MetaData>
			    <MediaTitle>{prop.music.title}</MediaTitle>
			    <ArtistName>
			    	{prop.music.artists[0] || prop.music.sourceBy.name}
			    </ArtistName>
		    </MetaData>
		    <Actions>
		    	<Action src={istatic.favorite_border_white()} alt="I'm love it"/>
		    	<Action src={istatic.iconLoop()} alt="loop"/>
		    	<Action src={istatic.iconShare()} alt="share"/>
		    </Actions>
	    </AboutContent>
	  </Media>
		</ViewPort>
	);
}

export default Watch;
