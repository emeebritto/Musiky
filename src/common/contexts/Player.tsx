import React, { useContext } from 'react';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import { EventTarget, SyntheticEvent, Music } from 'common/types';
import { PlayerContext } from './providers/Player-provider';
import { useFeaturedContext } from 'common/contexts/Featured';
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
		loop,
		setLoop,
		currentTime,
		setCurrentTime,
        currentTimeSeconds,
        setCurrentTimeSeconds,
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
        stopPlaylist,
		startPlaylist,
		changeMusic
	} = usePlaylistContext();


// ==================================================================


	const load = async(
        playIndex: number,
        list: Array<Music> | string,
        playlistId: string | undefined = undefined
    ): Promise<void> => {

        if (typeof list == 'string') {
            list = await axios.get(`${IstaticBaseUrl}playlist/${list}`)
                .then(r => r.data.list)
                .catch(err => console.error(err));
        }

        if(playlistId && typeof list != 'string') {
        	startPlaylist(playIndex, playlistId, list);
        }

        if(typeof list != 'string') {
    		setMusic(list[playIndex]);
            setBuffer(true);
            setPlaying(true);
            //stopAll();
        }
    }

    const stopPlayer = (): void => {
        stopPlaylist();
        setMusic(null);
        setBuffer(false);
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

    const toggleLoop = (): void => {
    	setLoop((loop: boolean) => !loop);
    }

    const changeCurrentTimeTo = (timeFloat: number, timeSeconds: number): void => {
        setCurrentTimeSeconds(Number(timeSeconds.toFixed(0)));
    	if (!seeking) setCurrentTime(timeFloat);
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
            currentTimeSeconds,
            duration
        },
    	load,
        stopPlayer,
    	onBuffer,
    	onPlayAndPause,
    	nextMusic,
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