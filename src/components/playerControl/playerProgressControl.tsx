import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { usePlayerContext } from 'common/contexts/player';
import { usePlayerProgressContext } from 'common/contexts/player/progress';
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

const PlayerProgressControl = () => {

  const {
    handleSeekChange,
    currentTimeSec,
    currentTime
  } = usePlayerProgressContext();
  const {
  	prop,
  	onPlayAndPause,
    nextMusic,
    handleSeekMouseUp,
    handleSeekMouseDown
  } = usePlayerContext();

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
    <PlayerControlPainel>
      <BtnsBackPlayNext>
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, -1)}}>
            <IconPlay src={istatic.iconBack()} alt="Back Music" />
          </BtnPlayerControl>
          {prop.buffer
            ? <Loading src={istatic.musicLoading()} alt='loading'/> 
            : <BtnPlayAndPause/>
          }
          <BtnPlayerControl onClick={e => {nextAndBack_Music(e, 1)}}>
             <IconPlay src={istatic.iconNext()} alt="Next Music" />
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
