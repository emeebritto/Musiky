import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import axios from 'axios';
import { IstaticBaseUrl } from 'api';
import { usePlayerContext } from 'common/contexts/player';
import { VerticalView } from 'components';

const MyFlowVerticalViewStyle = () => (`
  position: relative;
  align-items: flex-start;
  border-radius: 50px 50px 5px 5px;
  overflow: hidden;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  background-image: linear-gradient(180deg, #0C6DBB, #7740E9, #2235FF);
  transition: 400ms;
`)
const ViewPort = Styled.section`
  margin: 10px;
  border-radius: 45px 45px 5px 5px;
  width: 30vw;
  height: 345px;
  overflow: hidden;
  background-color: #020309;
`
const DiskField = Styled.section`
	position: relative;
	display: flex;
	justify-content: center;
	background-color: #000;
	width: 100%;
	height: 40%;
	box-shadow: inset 0 0 ${(props: {active: boolean}) => (
		props.active? "30px" : "0"
	)} rgba(0, 132, 255, 1);
`
const Disk = Styled.section`
	position: relative;
	top: -55%;
	display: flex;
	justify-content: center;
	align-items: center;
  width: 190px;
  height: 190px;
  border-radius: 50%;
  background: url(${(props: {img: string}) => (props.img)}) no-repeat center/175% #0C1B31;
  overflow: hidden;
  transition: 400ms;
  animation: ${(props: {playing: boolean}) => (
    props.playing ? "spin infinite 30s linear" : ''
  )};

  @keyframes spin {
	  to {
	    transform: rotate(360deg);
	  }
  }
`
const CenterHole = Styled.section`
	border-radius: 50%;
	width: 20px;
  height: 20px;
  background-color: #000;
  border: 5px solid #313331;
`
const Glass = Styled.section`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0.4;
	background-color: #0C1B31;
`
const SongInfors = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	background-color: #000;
`
const SongTitle = Styled.p`
`
const VibeBtnsField = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50%;
`
const VibeBtns = Styled.section`
	display: flex;
	width: 90%;
	flex-wrap: wrap;
`
const VibeBtn = Styled.button`
	border: none;
	border-radius: 10px;
	padding: 5px 10px;
	transition: 400ms;
	background-color: ${(props: {active: boolean}) => (
		props.active ? "#D9DADC" : "#001232"
	)};
	color: ${(props: {active: boolean}) => (
		props.active ? "#000" : "#fff"
	)};
	font-size: 0.9em;
	margin: 5px;
	cursor: pointer;
	box-shadow: 0 0 ${(props: {active: boolean}) => (
		props.active ? "20px" : "0"
	)} #D9DADC;

	:hover {
		background-color: ${(props: {active: boolean}) => (
			props.active ? "" : "#001257"
		)};
	}
`

const MyFlow = () => {

	const { prop, load } = usePlayerContext();

	const [ActiveVibe, setActiveVibe] = useState<string | null>(null);
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

	const getData = async() => {
		const params = `categoryInput=random&musicsType=vibes:${ActiveVibe}&maxPlaylists=1&maxPerList=2&minPerList=1`;
		const [ playlist ] = await axios.get(`${IstaticBaseUrl}playlist/all?${params}`)
			.then(r => r.data.items)
		console.log(playlist);
		return playlist;
	};

	const startSong = ({ id, list }) => {
		load({
			playIndex: 0,
			list: list,
			listId: id,
			onEnded: getData
		});
	};

	useEffect(()=>{
		if (!ActiveVibe) return;
		async function main() {
			startSong(await getData());
		}
		main();
	},[ActiveVibe])

	return (
	  <VerticalView
      viewLabel='MyFlow'
      addStyle={MyFlowVerticalViewStyle()}
      width='38.5%'
      desableSwipeMode
    >
			<ViewPort>
				<DiskField active={!!ActiveVibe}>
				<Disk
					img={prop.music && !!ActiveVibe
						? prop.music.thumbnails[1].url
						: ''
					}
					playing={prop.playing && !!ActiveVibe}
				>
						<CenterHole/>
					</Disk>
					<Glass/>
				</DiskField>
				<SongInfors>
					<SongTitle>
						{prop.music && !!ActiveVibe
							? `${prop.music.artists[0]} - ${prop.music.title}`
							: '-- ___ --'
						}
					</SongTitle>
				</SongInfors>
				<VibeBtnsField>
					<VibeBtns>
						{vibesOptions.map((vb, i) => {
							return (
								<VibeBtn
									onClick={()=> {
										vb === ActiveVibe? setActiveVibe(null) : setActiveVibe(vb)
									}}
									active={vb === ActiveVibe}
									key={i}
								>
										{vb}
								</VibeBtn>
							);
						})}
					</VibeBtns>
				</VibeBtnsField>
			</ViewPort>
		</VerticalView>
	);
}

export default MyFlow;
