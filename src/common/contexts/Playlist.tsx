import { useContext } from 'react';
import { Music, PlaylistProps } from 'common/types';
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
		setPlayListShuffle,
		on
	} = useContext(PlaylistContext);


// ==================================================================


	const startPlaylist = ({
		playIndex,
		listId,
		list,
		onEnded
	}: {
		playIndex: number,
		listId: string,
		list: Array<Music>,
		onEnded?: () => Promise<PlaylistProps>
	}) => {
		setPlayingIndex(playIndex);
		setPlaylistId(listId);
		setMusiclist(list);
		if (onEnded) {
			on.ended.current = onEnded;			
		}
	}

	const stopPlaylist = () => {
		setPlaylistId('');
		setMusiclist([]);
	};

	const changeMusic = async(action: number): Promise<Music | null> => {

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

        if (playlistFinished && on.ended.current) {
        	let {list} = await on.ended.current();
        	let listUpdated = [ ...musiclist, ...list];
        	setMusiclist(listUpdated);
        	return listUpdated[playingIndex + action];
        };

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