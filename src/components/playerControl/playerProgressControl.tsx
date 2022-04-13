import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { usePlayer, usePlayerProgress } from 'common/contexts/player';
import { fromSecondsToTime } from 'common/utils';
import istatic from "services/istatic";
import {
	PlayerControlPainel,
	BtnsBackPlayNext, 
  BtnPlayerControl,
  IconPlay,
  Loading,
  DurationSlider,
  MusicTimeCounter,
  MusicTimeTotal
} from './playerStyles';


const ScreenMode = Styled.img`
  width: 30px;
  opacity: 0.9;
`

interface Props {
  includes?: {
    loop?: boolean;
    fullscreen?: boolean;
  };
  isLive?: boolean;
  onRequestFullscreen?: ()=> void;
};

const PlayerProgressControl: React.FC<Props> = ({
  includes={},
  isLive,
  onRequestFullscreen
}) => {

  const {
    handleSeekChange,
    currentTimeSec,
    currentTime
  } = usePlayerProgress();
  const {
  	prop,
  	onPlayAndPause,
    toggleLoop,
    nextMusic,
    handleSeekMouseUp,
    handleSeekMouseDown
  } = usePlayer();

  const handlePlayPause = (e: React.SyntheticEvent<EventTarget>): void => {
    e.stopPropagation();
    onPlayAndPause();
  }
  const nextAndBack_Music = (
    e: React.SyntheticEvent<EventTarget>,
    action: number
  ): void => {
    e.stopPropagation();
    nextMusic(action);
  }

  //component:
  function BtnPlayAndPause() {
    return(
      <BtnPlayerControl play onClick={e => {handlePlayPause(e)}}>
        <IconPlay
          src={
            prop.playing
              ? istatic.iconUrl({ name: "pause", color: "black" })
              : istatic.iconUrl({ name: "play_arrow", color: "black" })
          }
          alt="Play or Pause"
        />
      </BtnPlayerControl>
    )
  }

	return (
    <PlayerControlPainel onClick={e=> e.stopPropagation()}>
      <BtnsBackPlayNext>
          <BtnPlayerControl
            nonactive={!prop.loop}
            disable={!includes.loop}
            onClick={toggleLoop}
          >
            <IconPlay src={istatic.iconUrl({ name: "loop" })} alt='loop Mode'/>
          </BtnPlayerControl>
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, -1)}}>
            <IconPlay src={istatic.iconUrl({ name: "skip_previous" })} alt="Back Music" />
          </BtnPlayerControl>
          {
            prop.buffer
              ? <Loading src={istatic.animatedSvgUrl({ name: "loading" })} alt='loading'/> 
              : <BtnPlayAndPause/>
          }
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, 1)}}>
             <IconPlay src={istatic.iconUrl({ name: "skip_next" })} alt="Next Music" />
          </BtnPlayerControl>
          <BtnPlayerControl
            nonactive={!prop.fullscreen}
            disable={!includes.fullscreen}
            onClick={onRequestFullscreen}
          >
            <IconPlay
              src={
                prop.fullscreen
                  ? istatic.iconUrl({ name: "close_fullscreen" })
                  : istatic.iconUrl({ name: "fullscreen" })
              }
              alt='Screen Mode'
            />
          </BtnPlayerControl>
      </BtnsBackPlayNext>
      <MusicTimeCounter>
         {fromSecondsToTime(currentTimeSec)}
      </MusicTimeCounter>
      <MusicTimeTotal>
         {isLive? 'LIVE' : fromSecondsToTime(prop.duration)}
      </MusicTimeTotal>
      <DurationSlider
        type='range' min={0} max={0.999999} step='any' 
        value={isLive? 0.999 : currentTime}
        onChange={e => {if (!isLive) handleSeekChange(e)}}
        onMouseDown={() => {if (!isLive) handleSeekMouseDown()}}
        onMouseUp={e => {if (!isLive) handleSeekMouseUp(e)}}
      />
    </PlayerControlPainel>
	);
}

export default PlayerProgressControl;
