import { useContext } from 'react';
import { PlayerProgressContext } from './playerProgress-provider';
export { PlayerProgressProvider } from './playerProgress-provider';

export function usePlayerProgressContext() {

	const {
		currentTime,
		setCurrentTime,
    currentTimeSec,
    setCurrentTimeSec
	} = useContext(PlayerProgressContext);


// =============================================================

  const changeCurrentTimeTo = (timeFloat: number, timeSeconds: number): void => {
    setCurrentTimeSec(Number(timeSeconds.toFixed(0)));
  	setCurrentTime(timeFloat);
  }

  const handleSeekChange = (e: React.SyntheticEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setCurrentTime(parseFloat(target.value));
  }

	return {
		changeCurrentTimeTo,
		handleSeekChange,
		currentTime,
		currentTimeSec
	}
}