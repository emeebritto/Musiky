import React, { useContext } from 'react';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import { useFeaturedContext } from 'common/contexts/Featured';
import { useAccountContext } from 'common/contexts/Account';
import { usePlaylistContext } from 'common/contexts/Playlist';
import { PlayerContext } from './player-provider';
export { usePlayerProgress, PlayerProgressProvider } from './progress';
export { usePlayerFlow, PlayerFlowProvider } from './flow';
export { PlayerProvider } from './player-provider';
import {
    EventTarget,
    SyntheticEvent,
    Music,
    PlayerMode,
    PlaylistProps
} from 'common/types';

export function usePlayer() {

	const {
        ref,
		music,
		setMusic,
		playing,
		setPlaying,
        mode,
        setMode,
        fullscreen,
        setFullscreen,
		volume,
		setVolume,
		lastVolume,
		setLastVolume,
		loop,
		setLoop,
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
		changeMusic,
        playlistInfor
	} = usePlaylistContext();

    const { updateHistory } = useAccountContext();


// ==================================================================

	const load = async({
        media=null,
        playIndex=0,
        playlist=null,
        onEnded
    }:{
        media?: Music | null,
        playIndex?: number,
        playlist?: PlaylistProps | null,
        onEnded?: () => Promise<PlaylistProps>
    }): Promise<void> => {

        if (media) {
            setMusic(media);
            setBuffer(true);
            setPlaying(true);
            updateHistory({
                type: 'music',
                data: media,
                playlistId: null
            });
            return;
        }

        if (playlist) {
            setMusic(playlist.list[playIndex]);
            setBuffer(true);
            setPlaying(true);
            startPlaylist({
                playIndex,
                playlist,
                onEnded
            });
            return;
        }
    }

    const stopPlayer = (): void => {
        stopPlaylist();
        setMusic(null);
        setBuffer(false);
    }

    const changeMode = (newMode?: PlayerMode): void => {
        if (!newMode) return;
        setMode(newMode);
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

    const nextMusic = async(action: number): Promise<void> => {

        setPlaying(false);
        onBuffer(true);
    	let hasMusic: Music | null = await changeMusic(action);

    	if(!hasMusic){
            onBuffer(false);
    		return;
    	} else {
            setPlaying(true);
            setMusic(hasMusic);
            updateHistory({
                type: 'music',
                data: hasMusic,
                playlistId: playlistInfor.playlistId
                    ? playlistInfor.playlistId
                    : null
            });
        }
    }

    const toggleLoop = (): void => {
    	setLoop((loop: boolean) => !loop);
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
        mode['only_audio']
            ? ref.audPlayer.current.seekTo(parseFloat(target.value))
            : ref.watchPlayer.current.seekTo(parseFloat(target.value))
    }

    const handleSeekMouseDown = (): void => {
        setSeeking(true);
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
            seeking,
            playing,
            duration,
            mode,
            fullscreen
        },
    	load,
        stopPlayer,
        setFullscreen,
        changeMode,
    	onBuffer,
    	onPlayAndPause,
    	nextMusic,
    	toggleLoop,
        handleSeekMouseUp,
        handleSeekMouseDown,
    	handleDuration,
    	changeVolumeTo,
    	toggleMuted,
        isPlayingId
    }
}
