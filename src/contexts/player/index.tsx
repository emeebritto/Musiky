import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { wSocket } from "services";
import axios from 'axios';
import { useAccountContext } from 'contexts/Account';
import { usePlaylistContext } from 'contexts/Playlist';
import { PlayerContext } from './player-provider';
export { usePlayerProgress, PlayerProgressProvider } from './progress';
export { usePlayerFlow, PlayerFlowProvider } from './flow';
export { PlayerProvider } from './player-provider';
import {
  EventTarget,
  SyntheticEvent,
  Music,
  PlaylistProps
} from 'common/types';

export function usePlayer() {

	const {
    ref,
		music,
		setMusic,
		playing,
		setPlaying,
    syncedStartIn,
    setSyncedStartIn,
    mode,
    setMode,
    isLive,
    setIsLive,
    isWs,
    setIsWs,
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
  const router = useRouter();

// ==================================================================

  const switchMode = (newMode?: string[]): void => {
    if (!newMode || !newMode.length) return;
    setMode([...newMode]);
  }

  const load = async({
    wsMedia=null,
    media=null,
    playIndex=0,
    playlist=null,
    onEnded
  }:{
    wsMedia?: string | null,
    media?: Music | null,
    playIndex?: number,
    playlist?: PlaylistProps | null,
    onEnded?: () => Promise<PlaylistProps>
  }): Promise<void> => {

    if (wsMedia) {
      const ws = wSocket.connection();
      ws.emit("connectRadio", wsMedia);
      ws.on("updateRadioTune", (tune: { media: { data:Music }}): void => {
        setMusic(tune.media.data);
        setBuffer(true);
        setIsLive(true);
        setIsWs(true);
        setPlaying(true);
      });
      return;
    } else {
      setIsLive(false);
      setIsWs(false);
      if (isWs) {
        const ws = wSocket.connection();
        ws.emit("disconnectRadio");
      }
    }

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
    if (isWs) {
      const ws = wSocket.connection();
      ws.emit("disconnectRadio");
    }
    setIsLive(false);
    setIsWs(false);
    stopPlaylist();
    setMusic(null);
    setBuffer(false);
  }

  const onBuffer = (status: boolean): void => {
    setBuffer(status);
  }

  const onPlayAndPause = (status: boolean | undefined = undefined): void => {
    if (status === false) stopPlayer();
    if (status !== undefined) {
      setPlaying(status);
      return;
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
    mode.includes('player:audio')
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

  const isReady = () => {
    if (music?.startIn && !syncedStartIn) {
      setSyncedStartIn(true);
      ref.audPlayer?.current?.seekTo(music.startIn, 'seconds');
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", (url: string): void => {
      if (url.includes('/watch')) {
        setSyncedStartIn(false);
        switchMode(['player:watch'])
      };
      if (!url.includes('/watch') && mode.includes('player:watch')) {
        switchMode(['player:audio']);
      };
    });
  },[])


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
    isReady,
    stopPlayer,
    setFullscreen,
    switchMode,
    isLive,
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
