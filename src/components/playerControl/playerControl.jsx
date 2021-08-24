import React, {useEffect, useState} from 'react'

import { player } from 'controllers'

import musicLoading from 'assets/icons/AnimatedSvg/loading.svg'
import iconBack from 'assets/icons/skip_previous_white_24dp.svg'
import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'
import iconPause from 'assets/icons/pause_black_24dp.svg'
import iconNext from 'assets/icons/skip_next_white_24dp.svg'

import iconLyric from 'assets/icons/mic_external_on_white_24dp.svg'
import iconRepeat from 'assets/icons/repeat_white_24dp.svg'
import iconVolume from 'assets/icons/volume_up_white_24dp.svg'
import iconVolumeDown from 'assets/icons/volume_down_white_24dp.svg'
import iconVolumeOff from 'assets/icons/volume_off_white_24dp.svg'

import { ViewPort, MusicInfor, PlayerControlPainel, OtherSetting, MusicImg, SectionTitles, MusicTitleInControl, 
MusicSubTitle, BtnsBackPlayNext, BtnPlayerControl, IconPlay, Loading, DurationSlider, 
VolumeControl, BtnIconVolume, BtnLyrics, BtnRepeat } from './playerStyles'

const PlayerControl = () => {

    const [ controlProp, setControlProp ] = useState({})
    const [ visibility, setVisibility ] = useState('none')


    const updatePlayerControl = props => {
        setControlProp({...props})
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
        player.setSeekingStatesTo(false)
        player.setCurrentTimeTo(parseFloat(e.target.value))
        player.seekTo(e.target.value)
    }

    const handleSeekChange = e => {
        setControlProp({...controlProp, currentTime: parseFloat(e.target.value)})
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
        player.subscribe(updatePlayerControl)

    },[])


    //component:
    function BtnPlayAndPause() {
        return(
            <BtnPlayerControl play onClick={() => {handlePlayPause()}}>
                <IconPlay src={controlProp.playing? iconPause : iconPlay} alt="Play or Pause" />
            </BtnPlayerControl>
        )
    }

    function getVolumeIconStatus() {
        if(controlProp.muted){ return iconVolumeOff }
        if(controlProp.volume < 0.4) { return iconVolumeDown }
        return iconVolume
    }

    return (
        <ViewPort lyrics={controlProp.showLyrics} style={{ display: `${visibility}`}} >
            <MusicInfor>
                {!visibility 
                    && <MusicImg 
                            src={controlProp.musicList[controlProp.indexOnPlaylist].snippet.thumbnails.medium.url} 
                            alt="musicImg"
                            />}
                <SectionTitles>
                    {!visibility 
                        && <MusicTitleInControl>
                                {controlProp.musicList[controlProp.indexOnPlaylist].snippet.title}
                            </MusicTitleInControl>}

                    {!visibility 
                        && <MusicSubTitle>
                                {controlProp.musicList[controlProp.indexOnPlaylist].Artist}
                            </MusicSubTitle>}
                </SectionTitles>
            </MusicInfor>

            <PlayerControlPainel>

                <BtnsBackPlayNext>
                    <BtnPlayerControl onClick={()=>{nextAndBack_Music(-1)}}>
                        <IconPlay src={iconBack} alt="Back Music" />
                    </BtnPlayerControl>

                    {controlProp.buffer 
                        ? <Loading src={musicLoading} alt='loading'/> 
                        : <BtnPlayAndPause/>}

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

                <BtnLyrics lyrics={controlProp.showLyrics} onClick={()=>{handlelyrics()}}>
                    <img src={iconLyric} alt="Lyric" />
                </BtnLyrics>

                <BtnRepeat loop={controlProp.loop} onClick={()=>{handleLoop()}}>
                    <img src={iconRepeat} alt="Repeat" />
                </BtnRepeat>

                <VolumeControl 
                    type='range' 
                    min={0} 
                    max={1} 
                    step='any'
                    value={controlProp.volume}
                    onChange={e => {handleVolumeChange(e)}}
                />

                <BtnIconVolume onClick={()=>{handleToggleMuted()}}>
                    <img src={getVolumeIconStatus()} alt="Volume Icon" />
                </BtnIconVolume> 

            </OtherSetting>
        </ViewPort>
    )
}

export default PlayerControl;