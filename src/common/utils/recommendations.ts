import getPlaylistsById from 'common/utils/playlists/byId';
import artistData from 'common/utils/artists/artistData';
import { Music, ArtistDataProps } from 'common/types';

interface Return {
	instrumental: Music,
	artist: ArtistDataProps,
	clip: Music
};

const isEmpty = (obj: any): boolean => !!!Object.keys(obj).length;

const recommendations = async(): Promise<Return | undefined> => {
	let noVocals = await getPlaylistsById({ id: 'PLrQmjsgFFZHi2KZhTy8717zlVnSi6Jiat' });
	let officialVideos = await getPlaylistsById({ id: 'PLrQmjsgFFZHiLLcr1cKedzZVBMnujZQEE' });
	let song = noVocals.list[~~(Math.random() * noVocals.list.length - 1)];
	let data = await artistData({ q: song.artists[0].replace(/\W|_/gi, '') });
	let tragetTitle = new RegExp(song.title, 'i');
	let tragetArtist = new RegExp(song.artists[0], 'i');
	let clip = officialVideos.list.find((ms: Music) => {
		return tragetTitle.test(ms.originTitle) 
		&& tragetArtist.test(ms.originTitle)
		|| tragetArtist.test(ms.artists[0])
	});

	if (isEmpty(data.artistData) || isEmpty(clip)) {
		return undefined;
	}

	return {
		instrumental: song,
		artist: data.artistData,
		clip: clip
	}
};

export default recommendations;