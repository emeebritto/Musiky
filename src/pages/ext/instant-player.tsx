import { SearchBar, PlayerProgressControl } from 	"components";
import React, { useState, useEffect, useRef } from 'react';
import { EventTarget, SyntheticEvent } from 'common/types';
import { musiky, istatic } from 'services';
import { useRouter } from "next/router";
import Styled from 'styled-components';
import ReactPlayer from 'react-player';
import type { NextPage } from 'next';
import axios from "axios";


const ViewPort = Styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
`

const Player = Styled(ReactPlayer)`
	display: hidden;
	position: absolute;
`

const Branding = Styled.img`
	width: 14rem;
	max-width: 40vw;
	margin: 0 0 5px 0;
`

const PlayerWrapper = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
  border-radius: 10px;
  width: 50em;
  max-width: 90vw;
  height: 320px;
  margin: 50px 0;
  background-color: #060C31;
`

const MusicCover = Styled.section<{ cover:string }>`
	background-color: red;
	width: 15em;
	height: 15em;
	border-radius: 10px;
	background: url(${({ cover }) => cover || ""}) center/100% no-repeat;
	margin: 10px 0;
`

const Controls = Styled.section`
	background-color: red;
	border-radius: 10px;
	width: 26em;
	height: 15em;
	margin: 10px 0;
`

const InstantPlayer:NextPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
	const [playing, setPlaying] = useState(false);
	const [syncedStartIn, setSyncedStartIn] = useState(false);
	const [volume, setVolume] = useState(1);
	const [lastVolume, setLastVolume] = useState(0);
	const [loop, setLoop] = useState(true);
	const [duration, setDuration] = useState(0);
	const [seeking, setSeeking] = useState(false);
	const [buffer, setBuffer] = useState(false);
	const [muted, setMuted] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [currentTimeSec, setCurrentTimeSec] = useState(0);
	const playerRef = useRef<ReactPlayer|null>(null);

  const play = async(url:string): Promise<void> => {
    if (!url) return;
    setUrl(url);
    setBuffer(true);
    setPlaying(true);
  }

  const stopPlayer = ():void => {
    setUrl("");
    setBuffer(false);
  }

  const onBuffer = (status:boolean):void => {
    setBuffer(status);
  }

  const onPlayAndPause = (status:boolean|undefined = undefined): void => {
    if (status !== undefined) return setPlaying(status);
    setPlaying((status:boolean) => !status);
  }

  const toggleLoop = ():void => {
  	setLoop((loop:boolean) => !loop);
  }

  const handleDuration = (duration:number):void => {
    setDuration(duration);
  }

  const changeVolumeTo = (value:number):void => {
  	if(muted) setMuted(false);
    if(value === 0) setMuted(true);
    setVolume(value);
  }

  const toggleMuted = ():void => {
    if(muted){
      setVolume(lastVolume);
      setMuted(false);
      return
    }
    setLastVolume(volume);
    setVolume(0);
    setMuted(true);
  }

  const handleSeekMouseUp = (e:React.SyntheticEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setSeeking(false);
    if (!playerRef?.current) return;
    playerRef.current.seekTo(parseFloat(target.value));
  }

  const handleSeekMouseDown = ():void => {
    setSeeking(true);
  }

  const changeCurrentTimeTo = (timeFloat: number, timeSeconds: number): void => {
    setCurrentTimeSec(Number(timeSeconds.toFixed(0)));
  	setCurrentTime(timeFloat);
  }

  const handleSeekChange = (e:React.SyntheticEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    setCurrentTime(parseFloat(target.value));
  }

  const getVolumeIconStatus = () => {
    if(muted) return istatic.iconUrl({ name: "volume_off" })
    if(volume < 0.4) return istatic.iconUrl({ name: "volume_down" })
    return istatic.iconUrl({ name: "volume_up" })
  }

 	useEffect(() => {
 		async function searchSound(query:string):Promise<void> {
 			await axios.get(`http://localhost:3000/api/v2/search/stream?q=${query}`)
 				.then(r => {
 					play(r.data?.url || "");
 				});
 		}
 		let query = String(router.query?.q || "");
 		if (query) searchSound(query);
 	}, [router.query.q])

	return (
		<ViewPort>
			<Branding src="/imgs/branding_Musiky.png" alt="Musiky Logo"/>
			<SearchBar/>
			{url &&
				<PlayerWrapper>
		      <Player
		      	ref={(player:ReactPlayer) => playerRef.current = player}
		        playing={playing}
		        volume={volume}
		        loop={loop}
		        onBuffer={()=> onBuffer(true)}
		        onBufferEnd={()=> onBuffer(false)}
	          onPlay={()=> onPlayAndPause(true)}
	          onPause={()=> onPlayAndPause(false)}
		        onProgress={(time: {played: number, playedSeconds: number}) => {
		          if (!seeking) {
		            changeCurrentTimeTo(time.played, time.playedSeconds);
		          }
		        }}
		        url={url}
		        config={{
		          file: {
		            attributes: { autoPlay: 1, controls: 0 },
		            forceAudio: true
		          }
		        }}
		      />
					<MusicCover cover="https://i.pinimg.com/originals/c1/70/30/c170307b2959a2052dc5bfe69fa71025.jpg"/>
					<Controls/>
				</PlayerWrapper>
	    }
		</ViewPort>
	);
}

export default InstantPlayer;

      	// <VolumeWrapper onClick={e=> e.stopPropagation()}>
	      //   <VolumeControl 
	      //     type='range'
	      //     min={0} 
	      //     max={1} 
	      //     step='any'
	      //     value={volume}
	      //     onChange={(e: React.SyntheticEvent<EventTarget>): void => {
				// 	    let target = e.target as HTMLInputElement;
				// 	    changeVolumeTo(parseFloat(target.value));
				// 	  }}
	      //   />
	      //   <BtnIconVolume onClick={()=> toggleMuted()}>
	      //     <img src={getVolumeIconStatus()} alt="Volume Icon"/>
	      //   </BtnIconVolume>
      	// </VolumeWrapper>