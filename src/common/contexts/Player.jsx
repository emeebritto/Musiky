import { useContext } from 'react';

import { PlayerContext } from './providers/Player-provider';
import { usePlaylistContext } from './Playlist';


export function usePlayerContext(){

	const {
        ref,
		music,
		setMusic,
		playing,
		setPlaying,
		volume,
		setVolume,
		lastVolume,
		setLastVolume,
		showLyrics,
		setShowLyrics,
		loop,
		setLoop,
		currentTime,
		setCurrentTime,
//		duration,
		setDuration,
		seeking,
		setSeeking,
		buffer,
		setBuffer,
		muted,
		setMuted	
	} = useContext(PlayerContext);

	const {
		startPlaylist,
		changeMusic
	} = usePlaylistContext();
	

// ==================================================================


	const load = (playIndex, list, playlistId=undefined) => {

        if(playlistId) {
        	startPlaylist(playIndex, playlistId, list);
        }

		setMusic(list[playIndex]);
        setBuffer(true);
    }

    const onBuffer = status => {
        setBuffer(status);
    }

    const onPlayAndPause = (status=undefined) => {

        if(status !== undefined) {
            setPlaying(status);
            return
        };

        setPlaying(status => !status);
    }

    const nextMusic = action => {

    	let hasMusic = changeMusic(action);

    	if(!hasMusic){
    		setPlaying(false);
    		return
    	}

        setMusic(hasMusic);
    }

    const toggleLyrics = (changeTo=false) => {

        if(changeTo) {
            setShowLyrics(changeTo);
            return
        };

        setShowLyrics(showLyrics => !showLyrics);
    }

    const toggleLoop = () => {
    	setLoop(loop => !loop);
    }

    const changeCurrentTimeTo = value => {
    	if (!seeking) setCurrentTime(value);
    }

    const handleDuration = duration => {
        setDuration(duration);
    }

    const changeVolumeTo = value => {
    	if(muted) setMuted(false);
        if(value === 0) setMuted(true);
        setVolume(value);
    }

    const toggleMuted = () => {
        if(muted){
            setVolume(lastVolume);
            setMuted(false);
            return
        }
        setLastVolume(volume);
        setVolume(0);
        setMuted(true);
    }

    const handleSeekMouseUp = e => {
        setSeeking(false);
        ref.playerRef.seekTo(parseFloat(e.target.value));
    }

    const handleSeekMouseDown = () => {
        setSeeking(true);
    }

    const handleSeekChange = e => {
        setCurrentTime(parseFloat(e.target.value));
    }

    const isPlayingId = id => {
        return music && id === music.id
    }

    return {
        ref,
        prop: {
            music,
            loop,
            volume,
            muted,
            buffer,
            playing,
            currentTime,
            showLyrics
        },
    	load,
    	onBuffer,
    	onPlayAndPause,
    	nextMusic,
    	toggleLyrics,
    	toggleLoop,
        handleSeekMouseUp,
        handleSeekMouseDown,
        handleSeekChange,
    	changeCurrentTimeTo,
    	handleDuration,
    	changeVolumeTo,
    	toggleMuted,
        isPlayingId
    }
}