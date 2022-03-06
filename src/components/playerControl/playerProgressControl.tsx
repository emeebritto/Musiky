import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { usePlayer, usePlayerProgress } from 'common/contexts/player';
import { fromSecondsToTime } from 'common/utils';
import { istatic } from "api/istatic";
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
  onRequestFullscreen?: ()=> void;
};

const PlayerProgressControl: React.FC<Props> = ({
  includes={},
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
        <IconPlay src={prop.playing? istatic.iconPause() : istatic.iconPlay()} alt="Play or Pause" />
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
            <IconPlay src={istatic.iconLoop()} alt='loop Mode'/>
          </BtnPlayerControl>
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, -1)}}>
            <IconPlay src={istatic.iconBack()} alt="Back Music" />
          </BtnPlayerControl>
          {
            prop.buffer
              ? <Loading src={istatic.musicLoading()} alt='loading'/> 
              : <BtnPlayAndPause/>
          }
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, 1)}}>
             <IconPlay src={istatic.iconNext()} alt="Next Music" />
          </BtnPlayerControl>
          <BtnPlayerControl
            nonactive={!prop.fullscreen}
            disable={!includes.fullscreen}
            onClick={onRequestFullscreen}
          >
            <IconPlay
              src={
                prop.fullscreen
                  ? istatic.close_fullscreen_white()
                  : istatic.fullscreen_white()
              }
              alt='Screen Mode'
            />
          </BtnPlayerControl>
      </BtnsBackPlayNext>
      <MusicTimeCounter>
         {fromSecondsToTime(currentTimeSec)}
      </MusicTimeCounter>
      <MusicTimeTotal>
         {fromSecondsToTime(prop.duration)}
      </MusicTimeTotal>
      <DurationSlider
        type='range' min={0} max={0.999999} step='any' 
        value={currentTime}
        onChange={e => {handleSeekChange(e)}}
        onMouseDown={() => {handleSeekMouseDown()}}
        onMouseUp={e => {handleSeekMouseUp(e)}}
      />
    </PlayerControlPainel>
	);
}

export default PlayerProgressControl;
