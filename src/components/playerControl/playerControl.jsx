import React, {useEffect, useState} from "react"

import musicLoading from '../../assets/icons/AnimatedSvg/loading.svg'
import iconBack from "../../assets/icons/skip_previous_white_24dp.svg"
import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg"
import iconPause from "../../assets/icons/pause_black_24dp.svg"
import iconNext from "../../assets/icons/skip_next_white_24dp.svg"

import iconLyric from "../../assets/icons/mic_external_on_white_24dp.svg"
import iconRepeat from "../../assets/icons/repeat_white_24dp.svg"
import iconVolume from "../../assets/icons/volume_up_white_24dp.svg"
import iconVolumeDown from "../../assets/icons/volume_down_white_24dp.svg"
import iconVolumeOff from "../../assets/icons/volume_off_white_24dp.svg"

import { ViewPort, MusicInfor, PlayerControlPainel, OtherSetting, MusicImg, SectionTitles, MusicTitleInControl, 
MusicSubTitle, BtnsBackPlayNext, BtnPlayerControl, IconPlay, Loading, DurationSlider, 
VolumeControl, BtnIconVolume, BtnLyrics, BtnRepeat } from "./playerStyles"

function PlayerControl({playingNow, db}) {
    const [visibility, setVisibility] = useState('none')
    const [currentTime, setCurrentTime] = useState(0)
    const [lastVolume, setLastVolume] = useState(0)
    const [musicList, setMusicList] = useState([])
    const [playing, setPlaying] = useState(false)
    const [seeking, setSeeking] = useState(false)
    const [loading, setLoading] = useState(true)
    const [lyrics, setLyrics] = useState(false)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(1)
    const [loop, setLoop] = useState(false)
    const [music, setMusic] = useState(0)


    const loadPlayerControl = (targetIndex, targetList) => {
        setMusic(targetIndex);
        setMusicList(targetList);
        setVisibility('');
        setPlaying(true);
    }

    const nextAndBack_Music = action => {
        playingNow.nextAndBack_Music(action)
        setPlaying(true)
    }

    const loadingStatus = status => {
        setLoading(status);
    }

    const handlePlayPause = () => {
        db.getFunction('play_Pause')();
        setPlaying(playing => !playing);
    }

    const slideCurrentTime = time => {
        setCurrentTime(time.played);
    }

    const slideBarProgress = state => {
        if (!seeking) {
            slideCurrentTime(state);
        }
    }

    const handlelyrics = () => {
        db.getFunction('lyricsScreen')();
        db.getFunction('lyricsMode_header')();
        setLyrics(lyrics => !lyrics)
    }

    const closeLyricsOnControl = () => {
        setLyrics(false)
    }

    const handleLoop = () => {
        setLoop(loop => !loop);
        db.getFunction('playerLoop')();
    }

    const handleSeekMouseUp = e => {
        setSeeking(false);
        db.getData("player").seekTo(parseFloat(e.target.value));
    }

    const handleSeekChange = e => {
        setCurrentTime(parseFloat(e.target.value));
    }

    const handleSeekMouseDown = e => {
        setSeeking(true);
    }

    const handleVolumeChange = e => {
        let volume = parseFloat(e.target.value)
        if(muted){ setMuted(false)}
        if(volume === 0){ setMuted(true)}
        setVolume(volume)
        db.getFunction("VolumeChange")(volume);
    }

    const handleToggleMuted = () => {
        if(muted){
            setVolume(lastVolume); 
            db.getFunction("VolumeChange")(lastVolume); 
            setMuted(false)
            return
        }
        setLastVolume(volume);
        setVolume(0); setMuted(true);
        db.getFunction("VolumeChange")(0);
    }

    useEffect(()=>{
        playingNow.subscribe(loadPlayerControl)
         return ()=>{ playingNow.unsubscribe(loadPlayerControl)}
    },[])

    useEffect(()=>{
        db.setFunction('slideBarProgress', slideBarProgress)
        db.setFunction('loadingStatus', loadingStatus)
        db.setFunction('closeLyricsOnControl', closeLyricsOnControl)
    }, [])

    //component:
    function Btn_PlayAndPause() {
        return(
            <BtnPlayerControl play onClick={() => {handlePlayPause()}}>
                <IconPlay src={playing? iconPause : iconPlay} alt="Play or Pause" />
            </BtnPlayerControl>
        )
    }

    return (
        <ViewPort lyrics={lyrics} style={{ display: `${visibility}`}}>
            <MusicInfor>
                {musicList.length && <MusicImg src={musicList[music].snippet.thumbnails.medium.url} alt="musicImg"/>}
                <SectionTitles>
                    {musicList.length && <MusicTitleInControl>{musicList[music].snippet.title}</MusicTitleInControl>}
                    {musicList.length && <MusicSubTitle>{musicList[music].snippet.channelTitle}</MusicSubTitle>}
                </SectionTitles>
            </MusicInfor>

            <PlayerControlPainel>

                <BtnsBackPlayNext>
                    <BtnPlayerControl onClick={()=>{nextAndBack_Music(-1)}}>
                        <IconPlay src={iconBack} alt="Back Music" />
                    </BtnPlayerControl>

                    {loading ? <Loading src={musicLoading} alt='loading'/> : <Btn_PlayAndPause/>}

                    <BtnPlayerControl onClick={()=>{nextAndBack_Music(1)}}>
                        <IconPlay src={iconNext} alt="Next Music" />
                    </BtnPlayerControl>
                </BtnsBackPlayNext>
                
                <DurationSlider
                    type='range' min={0} max={0.999999} step='any' 
                    value={currentTime}
                    onChange={e => {handleSeekChange(e)}}
                    onMouseDown={e => {handleSeekMouseDown(e)}}
                    onMouseUp={e => {handleSeekMouseUp(e)}}
                />
            </PlayerControlPainel>

            <OtherSetting>
                <BtnLyrics lyrics={lyrics} onClick={()=>{handlelyrics()}}>
                    <img src={iconLyric} alt="Lyric" />
                </BtnLyrics>
                <BtnRepeat loop={loop} onClick={()=>{handleLoop()}}>
                    <img src={iconRepeat} alt="Repeat" />
                </BtnRepeat>
                <VolumeControl type='range' min={0} max={1} step='any'
                    value={volume}
                    onChange={e => {handleVolumeChange(e)}}
                />
                <BtnIconVolume onClick={()=>{handleToggleMuted()}}>
                    <img src={muted? iconVolumeOff : iconVolume} alt="Volume Icon" />
                </BtnIconVolume>
            </OtherSetting>
        </ViewPort>
    )
}

export default PlayerControl;