import { createContext, useContext, useEffect } from 'react';

import { PlaylistContext } from './providers/Playlist-provider';


export function usePlaylistContext(){

	const {
		playingIndex,
		setPlayingIndex,
		musiclist,
		setMusiclist,
		playlistId,
		setPlaylistId,
		playlistLoop,
		setPlaylistLoop,
		playListShuffle,
		setPlayListShuffle	
	} = useContext(PlaylistContext);


// ==================================================================


	const startPlaylist = (playingIndex, playlistId, musicList) => {
		setPlayingIndex(playingIndex);
		setPlaylistId(playlistId);
		setMusiclist(musicList);
	}

	const changeMusic = action => {
	    setPlayingIndex(playListShuffle
                ? ~~(Math.random() * musiclist.length - 1)
                : playingIndex + action
        );

        let playlistFinished = false;

        if (playingIndex === musiclist.length){

            if(playlistLoop){
                setPlayingIndex(0);
            } else {
                setPlayingIndex(musiclist.length - 1);
                playlistFinished = true;
            }
        }

        return playlistFinished ? false : musiclist[playingIndex].id
	}


    const togglePlaylistShuffle = () => {
        setPlayListShuffle(!playListShuffle => playListShuffle)
    }

    const togglePlaylistLoop = () => {
        setPlaylistLoop(!playlistLoop => playlistLoop)
    }


	return {
		startPlaylist,
		changeMusic
	}
}