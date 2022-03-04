import React, { useContext } from 'react';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import { EventTarget, SyntheticEvent, Music, PlaylistProps } from 'common/types';
import { useFeaturedContext } from 'common/contexts/Featured';
import { useAccountContext } from 'common/contexts/Account';
import { usePlaylistContext } from 'common/contexts/Playlist';
import { PlayerContext } from './player-provider';
export { usePlayerProgress, PlayerProgressProvider } from './progress';
export { usePlayerFlow, PlayerFlowProvider } from './flow';
export { PlayerProvider } from './player-provider';

export function usePlayer() {

	const {
        ref,
		music,
		setMusic,
		playing,
		setPlaying,
        renderAudioPlayer,
        setRenderAudioPlayer,
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
        playIndex,
        list,
        listId=null,
        onEnded
    }:{
        playIndex: number,
        list: Array<Music>,
        listId: string | null,
        onEnded?: () => Promise<PlaylistProps>
    }): Promise<void> => {

        if (listId && list.length) {
        	startPlaylist({
                playIndex,
                listId,
                list,
                onEnded
            });
        };

        if (list.length) {
    		setMusic(list[playIndex]);
            setBuffer(true);
            setPlaying(true);
            updateHistory({
                type: 'music',
                data: list[playIndex],
                playlistId: listId
            });
        };
    }

    const stopPlayer = (): void => {
        stopPlaylist();
        setMusic(null);
        setBuffer(false);
    }

    const desableAudioPlayer = (status?: boolean=true): void => {
        setRenderAudioPlayer(status ? false : true);
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
        ref.audPlayer.current.seekTo(parseFloat(target.value));
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
            renderAudioPlayer
        },
    	load,
        stopPlayer,
        desableAudioPlayer,
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
