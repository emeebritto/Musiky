import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import Styled from 'styled-components';
import istatic from 'services/istatic';
import { usePlayer, usePlayerProgress } from 'contexts/player';
import { PlayerProgressControl } from 'components';


const PlayerWrapper = Styled.section`
  position: relative;
  border-radius: 10px;
  width: 755px;
  height: 426px;
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

const WatchPlayer = () => {

  const {
  	ref,
  	prop,
  	isLive,
  	toggleMuted,
  	changeVolumeTo,
  	setFullscreen,
  	nextMusic,
  	onBuffer,
  	onPlayAndPause
  } = usePlayer();
  const { changeCurrentTimeTo } = usePlayerProgress();
  const [controlsVisible, setControlsVisible] = useState(false);

  const isAllowed = prop.mode.includes('player:watch');

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

  const getVolumeIconStatus = () => {
    if(prop.muted) return istatic.iconUrl({ name: "volume_off" })
    if(prop.volume < 0.4) return istatic.iconUrl({ name: "volume_down" })
    return istatic.iconUrl({ name: "volume_up" })
  }

	return (
		<PlayerWrapper
			ref={(wrapper: HTMLDivElement) => ref.watchPlayerWrapper.current = wrapper}
  		onMouseEnter={()=> setControlsVisible(true)}
  		onMouseLeave={()=> setControlsVisible(false)}
		>
			{prop.music &&
	      <VideoPlayer
	      	ref={(player: HTMLDivElement) => ref.watchPlayer.current = player}
	        playing={prop.playing}
	        volume={prop.volume}
	        loop={prop.loop}
	        //onDuration={(duration: number) => ()}
	        onBuffer={()=> onBuffer(true)}
	        onBufferEnd={()=> onBuffer(false)}
	        onEnded={()=> nextMusic(1)}
	        //onError={(e) => console.log(e)}
          onPlay={()=> isAllowed && onPlayAndPause(true)}
          onPause={()=> isAllowed && onPlayAndPause(false)}
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
    	}
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
      			isLive={isLive}
      			includes={{loop:true, fullscreen:true}}
      			onRequestFullscreen={fullscreenMode}
      		/>
      	</ProgressWrapper>
      </Controls>
    </PlayerWrapper>
	);
}

export default WatchPlayer;
