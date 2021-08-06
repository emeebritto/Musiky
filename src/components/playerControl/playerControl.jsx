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

function PlayerControl({ player }) {

    const [ controlProp, setControlProp ] = useState({})
    const [visibility, setVisibility] = useState('none')


    const updatePlayerControl = props => {
        setControlProp(props)
        setVisibility('')
    }

    const handlePlayPause = () => {
        player.play_Pause()
    }

    const nextAndBack_Music = action => {
        player.nextMusic(action)
    }

    const handlelyrics = () => {
        player.lyricsScreen()
    }

    const handleLoop = () => {
        player.toggleLoop()
    }

    const handleSeekMouseUp = e => {
        player.seekTo(e.target.value)
    }

    const handleSeekChange = e => {
        player.setCurrentTimeTo(parseFloat(e.target.value))
    }

    const handleSeekMouseDown = () => {
        player.setSeekingStatesTo(true)
    }

    const handleVolumeChange = e => {
        let volume = parseFloat(e.target.value)
        player.setVolumeTo = volume
    }

    const handleToggleMuted = () => {
        player.toggleMuted()
    }

    useEffect(()=>{
        player.setPlayerControlFunction(updatePlayerControl)
    },[])


    //component:
    function Btn_PlayAndPause() {
        return(
            <BtnPlayerControl play onClick={() => {handlePlayPause()}}>
                <IconPlay src={controlProp.playing? iconPause : iconPlay} alt="Play or Pause" />
            </BtnPlayerControl>
        )
    }

    return (
        <ViewPort lyrics={controlProp.lyrics} style={{ display: `${visibility}`}} >
            <MusicInfor>
                {Object.keys(controlProp).length && <MusicImg src={controlProp.musicList[controlProp.indexOnPlaylist].snippet.thumbnails.medium.url} alt="musicImg"/>}
                <SectionTitles>
                    {Object.keys(controlProp).length && <MusicTitleInControl>{controlProp.musicList[controlProp.indexOnPlaylist].snippet.title}</MusicTitleInControl>}
                    {Object.keys(controlProp).length && <MusicSubTitle>{controlProp.musicList[controlProp.indexOnPlaylist].snippet.channelTitle}</MusicSubTitle>}
                </SectionTitles>
            </MusicInfor>

            <PlayerControlPainel>

                <BtnsBackPlayNext>
                    <BtnPlayerControl onClick={()=>{nextAndBack_Music(-1)}}>
                        <IconPlay src={iconBack} alt="Back Music" />
                    </BtnPlayerControl>

                    {controlProp.buffer ? <Loading src={musicLoading} alt='loading'/> : <Btn_PlayAndPause/>}

                    <BtnPlayerControl onClick={()=>{nextAndBack_Music(1)}}>
                        <IconPlay src={iconNext} alt="Next Music" />
                    </BtnPlayerControl>
                </BtnsBackPlayNext>
                
                <DurationSlider
                    type='range' min={0} max={0.999999} step='any' 
                    value={controlProp.currentTime}
                    onChange={e => {handleSeekChange(e)}}
                    onMouseDown={() => {handleSeekMouseDown()}}
                    onMouseUp={e => {handleSeekMouseUp(e)}}
                />
            </PlayerControlPainel>

            <OtherSetting>
                <BtnLyrics lyrics={controlProp.lyrics} onClick={()=>{handlelyrics()}}>
                    <img src={iconLyric} alt="Lyric" />
                </BtnLyrics>
                <BtnRepeat loop={controlProp.loop} onClick={()=>{handleLoop()}}>
                    <img src={iconRepeat} alt="Repeat" />
                </BtnRepeat>
                <VolumeControl type='range' min={0} max={1} step='any'
                    value={controlProp.volume}
                    onChange={e => {handleVolumeChange(e)}}
                />
                <BtnIconVolume onClick={()=>{handleToggleMuted()}}>
                    <img src={controlProp.muted? iconVolumeOff : iconVolume} alt="Volume Icon" />
                </BtnIconVolume>
            </OtherSetting>
        </ViewPort>
    )
}

export default PlayerControl;