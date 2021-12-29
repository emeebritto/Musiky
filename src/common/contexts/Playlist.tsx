import { useContext } from 'react';
import { Music } from 'common/types';
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


	const startPlaylist = (
		playingIndex: number,
		playlistId: string,
		musicList: Array<Music>
	) => {
		setPlayingIndex(playingIndex);
		setPlaylistId(playlistId);
		setMusiclist(musicList);
	}

	const stopPlaylist = () => {
		setPlaylistId('');
		setMusiclist([]);
	};

	const changeMusic = (action: number): null | Music => {

		if(!musiclist) return null;

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

        return playlistFinished ? null : musiclist[playingIndex + action];
	}


    const togglePlaylistShuffle = (): void => {
        setPlayListShuffle((playListShuffle: boolean) => !playListShuffle)
    }

    const togglePlaylistLoop = (): void => {
        setPlaylistLoop((playlistLoop: boolean) => !playlistLoop)
    }

    const isPlayingIndex = (id: string, index: number): boolean => {
    	return id === playlistId && index === playingIndex
    }


	return {
		playlistInfor: {
			playingIndex,
			playlistId,
			musiclist,
			playlistLoop,
			playListShuffle
		},
		startPlaylist,
		stopPlaylist,
		changeMusic,
		togglePlaylistShuffle,
		togglePlaylistLoop,
		isPlayingIndex
	}
}