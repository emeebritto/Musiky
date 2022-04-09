import React, { createContext, useState, useEffect, useContext } from 'react';
import { usePlayer } from 'common/contexts/player';
import axios from 'axios';
import { IstaticBaseUrl } from 'services';
import { Music, PlaylistProps } from 'common/types';
import { sleep } from 'common/utils';

interface FlowContextProp {
	diskOff: boolean;
	setDiskOff: (s: boolean)=> void;
	diskImg: string;
	setDiskImg: (s: string)=> void;
	activeVibe: string | null;
	setActiveVibe: (s: string | null)=> void;
	vibesOptions: string[];
	setVibesOptions: (s: string[])=> void;
};
interface LayoutProps {
	children: React.ReactNode;
}

export const PlayerFlowContext = createContext<FlowContextProp>({} as FlowContextProp);
PlayerFlowContext.displayName = 'PlayerFlow';

export const PlayerFlowProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [diskOff, setDiskOff] = useState(false);
	const [diskImg, setDiskImg] = useState('');
	const [activeVibe, setActiveVibe] = useState<string | null>(null);
	const [vibesOptions, setVibesOptions] = useState([
		'Happy',
		'Sad',
		'Very Sad',
		'Alone',
		'Old',
		'Heart Broken',
		'Relationship',
		'Chill Night',
		'Summer Party',
		'Melancholy',
		'lo-fi',
		'chill',
		'Dance',
		'Slowed',
		'Workout',
		'morning'
	]);


	return (
		<PlayerFlowContext.Provider value={{
			diskOff,
			setDiskOff,
			diskImg,
			setDiskImg,
			activeVibe,
			setActiveVibe,
			vibesOptions,
			setVibesOptions
		}}>
			{ children }
		</PlayerFlowContext.Provider>
	)
}

export function usePlayerFlow() {

	const {
		diskOff,
		setDiskOff,
		diskImg,
		setDiskImg,
		activeVibe,
		setActiveVibe,
		vibesOptions,
		setVibesOptions
	} = useContext(PlayerFlowContext);
	const { prop, load } = usePlayer();


// =============================================================


	const getData = async(): Promise<PlaylistProps> => {
		const params = `categoryInput=random&musicsType=vibes:${activeVibe}&maxPlaylists=1&maxPerList=2&minPerList=1`;
		const [ playlist ] = await axios.get(`${IstaticBaseUrl}playlist/all?${params}`)
			.then(r => r.data.items)
		playlist.id = 'flow-dffvgbgh632d';
		return playlist;
	};

	const updateDisk = async(music: Music | null) => {
		if (music === null) {
			setDiskImg('');
			return;
		}
		setDiskOff(true);
		await sleep(()=> setDiskImg(music.thumbnails[1].url), 500);
		await sleep(()=> setDiskOff(false), 500);
	};

	const startSong = (playlist: PlaylistProps) => {
		load({ playlist, onEnded: getData });
	};

	useEffect(()=>{
		if (!prop.music || !activeVibe) {
			updateDisk(null);
			return;
		};
		updateDisk(prop.music);
	},[prop.music]);

	useEffect(()=>{
		if (!activeVibe) return;
		async function main() {
			startSong(await getData());
		}
		main();
	},[activeVibe]);

	return {
		diskOff,
		diskImg,
		activeVibe,
		vibesOptions,
		setActiveVibe
	}
}