import React, { useContext } from 'react';
import { EventTarget, SyntheticEvent, Music } from 'common/types';
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


	const load = (
        playIndex: number,
        list: Array<Music>,
        playlistId: string | undefined = undefined
    ): void => {

        if(playlistId) {
        	startPlaylist(playIndex, playlistId, list);
        }

		setMusic(list[playIndex]);
        setBuffer(true);
    }

    const onBuffer = (status: boolean): void => {
        setBuffer(status);
    }

    const onPlayAndPause = (status: boolean | undefined = undefined): void => {

        if(status !== undefined) {
            setPlaying(status);
            return
        };

        setPlaying((status: boolean) => !status);
    }

    const nextMusic = (action: number): void => {

    	let hasMusic: Music | null = changeMusic(action);

    	if(!hasMusic){
    		setPlaying(false);
    		return
    	}

        setMusic(hasMusic);
    }

    const toggleLyrics = (changeTo: boolean =false): void => {

        if(changeTo) {
            setShowLyrics(changeTo);
            return
        };

        setShowLyrics((showLyrics: boolean) => !showLyrics);
    }

    const toggleLoop = (): void => {
    	setLoop((loop: boolean) => !loop);
    }

    const changeCurrentTimeTo = (value: number): void => {
    	if (!seeking) setCurrentTime(value);
    }

    const handleDuration = (duration: number): void => {
        setDuration(duration);
    }

    const changeVolumeTo = (value: number): void => {
    	if(muted) setMuted(false);
        if(value === 0) setMuted(true);
        setVolume(value);
    }

    const toggleMuted = (): void => {
        if(muted){
            setVolume(lastVolume);
            setMuted(false);
            return
        }
        setLastVolume(volume);
        setVolume(0);
        setMuted(true);
    }

    const handleSeekMouseUp = (e: React.SyntheticEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        setSeeking(false);
        ref.playerRef.seekTo(parseFloat(target.value));
    }

    const handleSeekMouseDown = (): void => {
        setSeeking(true);
    }

    const handleSeekChange = (e: React.SyntheticEvent<EventTarget>): void => {
        let target = e.target as HTMLInputElement;
        setCurrentTime(parseFloat(target.value));
    }

    const isPlayingId = (id: string): boolean => {
        if(music) return id === music.id
        return false;
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