import { useContext, useEffect } from 'react';
import { PlayerProgressContext } from './playerProgress-provider';
import { PlayerContext } from '../player-provider';
export { PlayerProgressProvider } from './playerProgress-provider';

export function usePlayerProgress() {

	const {
		currentTime,
		setCurrentTime,
    currentTimeSec,
    setCurrentTimeSec
	} = useContext(PlayerProgressContext);

	const { ref, isLive, mode } = useContext(PlayerContext);


// =============================================================

  const changeCurrentTimeTo = (timeFloat: number, timeSeconds: number): void => {
    setCurrentTimeSec(Number(timeSeconds.toFixed(0)));
  	setCurrentTime(timeFloat);
  }

  const handleSeekChange = (e: React.SyntheticEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setCurrentTime(parseFloat(target.value));
  }

  useEffect(() => {
  	if (mode.includes('player:audio') && ref.audPlayer?.current?.seekTo) {
  		ref.audPlayer.current.seekTo(currentTime);
  	} else if (mode.includes('player:watch') && ref.watchPlayer?.current?.seekTo) {
  		ref.watchPlayer.current.seekTo(currentTime);
  	}
  },[ref.watchPlayer.current, ref.audPlayer.current, mode])

	return {
		changeCurrentTimeTo,
		handleSeekChange,
		currentTime,
		currentTimeSec
	}
}
