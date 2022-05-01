import { istatic } from 'services';
import { Music, ArtistDataProps } from 'common/types';


interface Recommendations {
	instrumental:Music;
	artist:ArtistDataProps;
	clip:Music;
};

const isEmpty = (obj:any): boolean => !Object.keys(obj).length;

const recommendations = async(): Promise<Recommendations | null> => {
	const noVocals = await istatic.playlistData({ id: 'PLrQmjsgFFZHi2KZhTy8717zlVnSi6Jiat' })
		.then(r => r.data);
	const officialVideos = await istatic.playlistData({ id: 'PLrQmjsgFFZHiLLcr1cKedzZVBMnujZQEE' })
		.then(r => r.data);

	const randomSong = noVocals.list[~~(Math.random() * noVocals.list.length - 1)];
	const songArtistAltId = randomSong.artists[0].altId;

	const artistData = await istatic.artistsData({ altId: songArtistAltId })
		.then(r => typeof r.data[0] == 'object' ? r.data[0] : null);

	const tragetTitle = new RegExp(randomSong.title, 'i');
	const tragetArtist = new RegExp(randomSong.artists[0].name, 'i');
	
	const clip = officialVideos.list.find((ms: Music) => {
		return tragetTitle.test(ms.originTitle) 
			&& tragetArtist.test(ms.originTitle)
			|| tragetArtist.test(ms.artists[0].name)
	});

	if (!artistData || !clip || isEmpty(clip)) return null;

	return {
		instrumental: randomSong,
		artist: artistData,
		clip: clip
	}
};

export default recommendations;
