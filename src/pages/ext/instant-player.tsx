import { SearchBar, PlayerProgressControl } from 	"components";
import React, { useState, useEffect, useRef } from 'react';
import { EventTarget, SyntheticEvent } from 'common/types';
import { fromSecondsToTime } from 'common/utils';
import { musiky, istatic } from 'services';
import { useRouter } from "next/router";
import Styled from 'styled-components';
import ReactPlayer from 'react-player';
import type { NextPage } from 'next';
import axios from "axios";
import {
	PlayerControlPainel,
	BtnsBackPlayNext, 
  BtnPlayerControl,
  IconPlay,
  Loading,
  MusicTimeTotal
} from 'components/playerControl/playerStyles';

const ViewPort = Styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	align-items: center;
	height: 100vh;
`

const Player = Styled(ReactPlayer)`
	display: hidden;
	position: absolute;
	top: 0;
	left: 0;
	width: 0px;
	height: 0px;
`

const Branding = Styled.img`
	width: 15rem;
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
  min-height: 320px;
  margin: 50px 0;
  background-color: #060C1E;
`

const MusicCover = Styled.section<{ cover:string }>`
	position: relative;
	width: 15em;
	height: 15em;
	border-radius: 10px;
	background: url(${({ cover }) => cover || ""}) center/100% no-repeat;
	margin: 10px 0;
`

const ControlsWrapper = Styled.section`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	width: 26em;
	height: 15em;
	margin: 10px 0;
`

const MusicInfor = Styled.section`
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 55px;
`

const Text = Styled.p`
	margin: 0 15px;
	color: #fff;
`

const Title = Styled(Text)`
	margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: 4px;
  word-break: keep-all;
`

const Owner = Styled(Text)`
	opacity: 0.8;
`

const ProgressWrapper = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90%;
	height: 30px;
`

const DurationSlider = Styled.input`
  -webkit-appearance: none;
  width: 90%;
  outline: none;
  height: 4px;
  border-radius: 5px;
  cursor: pointer;

  ::-webkit-slider-thumb{
    -webkit-appearance: none;
    position: relative;
    height: 15px;
    width: 15px;
    top: 0px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0px 1px 20px black;
  }
`

const Controls = Styled.section`
	display: flex;
	justify-content: space-around;
	width: 90%;
	height: 50px;
`

const BtnsWrapper = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 50%;
	height: 100%;
`

const CountWrapper = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 20%;
	height: 100%;
`

const MusicTimeCounter = Styled.p`
  font-size: 0.9em;
  opacity: 0.8;
`

const Warn = Styled.p`
	position: absolute;
	font-size: 0.8em;
	opacity: 0.8;
	bottom: -25px;
`

const InstantPlayer:NextPage = () => {
  const router = useRouter();
  const [url, setUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [owner, setOwnwer] = useState<string>("");
  const [cover, setCover] = useState<string>('');
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

  //component:
  function PlayAndPauseBtn() {
  	const state = playing ? "pause" : "play_arrow";
    return(
      <BtnPlayerControl play onClick={e => onPlayAndPause()}>
        <IconPlay
          src={istatic.iconUrl({ name: state, color: "black" })}
          alt="Play or Pause"
        />
      </BtnPlayerControl>
    )
  }

 	useEffect(() => {
 		async function searchSound(query:string):Promise<void> {
 			await axios.get(`${musiky.api.baseUrl}/v2/search/stream?q=${query} audio`)
 				.then(r => {
 					setTitle(r.data?.title || "unknown");
 					setOwnwer(r.data?.channel.name || "unknown");
 					setCover(r.data?.cover?.src.url || "https://i.pinimg.com/474x/96/a2/b9/96a2b9240a365ec80e638ec6d3cce5ee.jpg");
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
		        onDuration={(duration:number) => handleDuration(duration)}
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
					<MusicCover cover={cover}>
						<Warn>Image provided by Neblika</Warn>
					</MusicCover>
					<ControlsWrapper>
						<MusicInfor>
							<Title>{title}</Title>
							<Owner>{owner}</Owner>
						</MusicInfor>
						<ProgressWrapper>
				      <DurationSlider
				        type='range' min={0} max={0.999999} step='any' 
				        value={currentTime}
				        onChange={e => handleSeekChange(e)}
				        onMouseDown={() => handleSeekMouseDown()}
				        onMouseUp={e => handleSeekMouseUp(e)}
				      />
						</ProgressWrapper>
						<Controls>
							<CountWrapper>
								<MusicTimeCounter>
									{fromSecondsToTime(currentTimeSec)}
								</MusicTimeCounter>
							</CountWrapper>
							<BtnsWrapper>
								<BtnPlayerControl onClick={e => ({})}>
			            <IconPlay src={istatic.iconUrl({ name: "skip_previous" })} alt="Back Music" />
			          </BtnPlayerControl>
			          {
			            (buffer && false) // off buffer detection
			              ? <Loading src={istatic.animatedSvgUrl({ name: "loading" })} alt='loading'/> 
			              : <PlayAndPauseBtn/>
			          }
			          <BtnPlayerControl onClick={e => ({})}>
			             <IconPlay src={istatic.iconUrl({ name: "skip_next" })} alt="Next Music" />
			          </BtnPlayerControl>
							</BtnsWrapper>
							<CountWrapper>
								<MusicTimeCounter>
									{fromSecondsToTime(duration)}
								</MusicTimeCounter>
							</CountWrapper>
						</Controls>
					</ControlsWrapper>
				</PlayerWrapper>
	    }
		</ViewPort>
	);
}


export default InstantPlayer;
