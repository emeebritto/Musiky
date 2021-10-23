import React from 'react';

import { usePlayerContext } from 'common/contexts/Player';

import musicLoading from 'assets/icons/AnimatedSvg/loading.svg';
import iconBack from 'assets/icons/skip_previous_white_24dp.svg';
import iconPlay from 'assets/icons/play_arrow_black_24dp.svg';
import iconPause from 'assets/icons/pause_black_24dp.svg';
import iconNext from 'assets/icons/skip_next_white_24dp.svg';

import iconLyric from 'assets/icons/mic_external_on_white_24dp.svg';
import iconRepeat from 'assets/icons/repeat_white_24dp.svg';
import iconVolume from 'assets/icons/volume_up_white_24dp.svg';
import iconVolumeDown from 'assets/icons/volume_down_white_24dp.svg';
import iconVolumeOff from 'assets/icons/volume_off_white_24dp.svg';

import { ViewPort, MusicInfor, PlayerControlPainel, OtherSetting, MusicImg, SectionTitles, MusicTitleInControl, 
MusicSubTitle, BtnsBackPlayNext, BtnPlayerControl, IconPlay, Loading, DurationSlider, 
VolumeControl, BtnIconVolume, BtnLyrics, BtnRepeat } from './playerStyles';

const PlayerControl = () => {

    const {
        prop,
        onPlayAndPause,
        nextMusic,
        toggleLyrics,
        toggleLoop,
        handleSeekMouseUp,
        handleSeekMouseDown,
        handleSeekChange,
        changeVolumeTo,
        toggleMuted
    } = usePlayerContext();


    const handlePlayPause = e => {
        e.stopPropagation();
        onPlayAndPause();
    }

    const nextAndBack_Music = (e, action) => {
        e.stopPropagation();
        nextMusic(action);
    }

    const handlelyrics = () => {
        toggleLyrics();
    }

    const handlelyricsMobile = e => {
        if(window.innerWidth < 570){
            toggleLyrics();
        }
    }

    const handleLoop = () => {
        toggleLoop();
    }

    const handleVolumeChange = e => {
        changeVolumeTo(parseFloat(e.target.value));
    }

    const handleToggleMuted = () => {
        toggleMuted();
    }


    //component:
    function BtnPlayAndPause() {
        return(
            <BtnPlayerControl play onClick={e => {handlePlayPause(e)}}>
                <IconPlay src={prop.playing? iconPause : iconPlay} alt="Play or Pause" />
            </BtnPlayerControl>
        )
    }

    function getVolumeIconStatus() {
        if(prop.muted) return iconVolumeOff
        if(prop.volume < 0.4) return iconVolumeDown
        return iconVolume
    }

    return (
        <ViewPort 
            lyrics={prop.showLyrics}
            onClick={e =>{handlelyricsMobile(e)}}
            style={{ display: `${prop.music ? '' : 'none'}`}}
            >
            {prop.music && <MusicInfor>
                <MusicImg 
                    src={prop.music.snippet.thumbnails.medium.url}
                    alt="musicImg"
                    />
                <SectionTitles>
                    <MusicTitleInControl>
                        {prop.music.snippet.title}
                    </MusicTitleInControl>


                    <MusicSubTitle>
                        {prop.music.Artist}
                    </MusicSubTitle>
                </SectionTitles>}
            </MusicInfor>}

            <PlayerControlPainel>

                <BtnsBackPlayNext>
                    <BtnPlayerControl onClick={e => {nextAndBack_Music(e, -1)}}>
                        <IconPlay src={iconBack} alt="Back Music" />
                    </BtnPlayerControl>

                    {prop.buffer 
                        ? <Loading src={musicLoading} alt='loading'/> 
                        : <BtnPlayAndPause/>}

                    <BtnPlayerControl onClick={e => {nextAndBack_Music(e, 1)}}>
                        <IconPlay src={iconNext} alt="Next Music" />
                    </BtnPlayerControl>
                </BtnsBackPlayNext>
                
                <DurationSlider
                    type='range' min={0} max={0.999999} step='any' 
                    value={prop.currentTime}
                    onChange={e => {handleSeekChange(e)}}
                    onMouseDown={() => {handleSeekMouseDown()}}
                    onMouseUp={e => {handleSeekMouseUp(e)}}
                />
            </PlayerControlPainel>

            <OtherSetting>

                <BtnLyrics lyrics={prop.showLyrics} onClick={()=> handlelyrics()}>
                    <img src={iconLyric} alt="Lyric" />
                </BtnLyrics>

                <BtnRepeat loop={prop.loop} onClick={()=>{handleLoop()}}>
                    <img src={iconRepeat} alt="Repeat" />
                </BtnRepeat>

                <VolumeControl 
                    type='range' 
                    min={0} 
                    max={1} 
                    step='any'
                    value={prop.volume}
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