import { useContext } from 'react';

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

		if(!musiclist) return false

	    setPlayingIndex(playListShuffle
                ? ~~(Math.random() * musiclist.length - 1)
                : playingIndex + action
        );

        let playlistFinished = false;

        if (playingIndex === (musiclist.length -1)){

            if(playlistLoop){
                setPlayingIndex(0);
            } else {
                setPlayingIndex(musiclist.length - 1);
                playlistFinished = true;
            }
        }

        return playlistFinished ? false : musiclist[playingIndex + action]
	}


    const togglePlaylistShuffle = () => {
        setPlayListShuffle(playListShuffle => !playListShuffle)
    }

    const togglePlaylistLoop = () => {
        setPlaylistLoop(playlistLoop => !playlistLoop)
    }

    const isPlayingIndex = (id, index) => {
    	return id === playlistId && index === playingIndex
    }


	return {
		playlistInfor: {
			playingIndex,
			musiclist,
			playlistLoop,
			playListShuffle
		},
		startPlaylist,
		changeMusic,
		togglePlaylistShuffle,
		togglePlaylistLoop,
		isPlayingIndex
	}
}