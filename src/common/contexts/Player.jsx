import { createContext, useContext, useEffect } from 'react';

import { PlayerContext } from './providers/Player-provider';
import { usePlaylistContext } from './Playlist';


export function usePlayerContext(){

	const {
		playerRef,
		musicId,
		setMusicId,
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
		duration,
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

		setMusicId(list[playIndex].id);
        setBuffer(true);
    }

    const seekTo = value => {
        playerRef.seekTo(parseFloat(value));
    }

    const onBuffer = status => {
        setBuffer(status);
    }

    const onPlayAndPause = status => {
        setPlaying(status);
    }

    const nextMusic = action => {

    	let hasMusic = changeMusic(action);

    	if(!hasMusic){
    		setPlaying(false);
    		return
    	}

        setMusicId(hasMusic);
    }

    const lyricsScreen = () => {
    	setShowLyrics(showLyrics => showLyrics);
    }

    const closeLyrics = () => {
        if(showLyrics) setShowLyrics(false);
    }

    const toggleLoop = () => {
    	setLoop(loop => loop);
    }

    const changeSeekingStatesTo = states => {
    	setSeeking(states);
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

    return {
    	load,
    	seekTo,
    	onBuffer,
    	onPlayAndPause,
    	nextMusic,
    	lyricsScreen,
    	closeLyrics,
    	toggleLoop,
    	changeSeekingStatesTo,
    	changeCurrentTimeTo,
    	handleDuration,
    	changeVolumeTo,
    	toggleMuted
    }
}