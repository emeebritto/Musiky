import React from 'react';

import { usePlayerContext } from 'common/contexts/Player';

import { istatic } from "api/istatic";

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
                <IconPlay src={prop.playing? istatic.iconPause() : istatic.iconPlay()} alt="Play or Pause" />
            </BtnPlayerControl>
        )
    }

    function getVolumeIconStatus() {
        if(prop.muted) return istatic.iconVolumeOff()
        if(prop.volume < 0.4) return istatic.iconVolumeDown()
        return istatic.iconVolume()
    }

    return (
        <ViewPort 
            lyrics={prop.showLyrics}
            onClick={e =>{handlelyricsMobile(e)}}
            style={{ display: `${prop.music ? '' : 'none'}`}}
            >
            {prop.music && <MusicInfor>
                <MusicImg 
                    src={prop.music.thumbnails.medium.url}
                    alt="musicImg"
                    />
                <SectionTitles>
                    <MusicTitleInControl>
                        {prop.music.title}
                    </MusicTitleInControl>


                    <MusicSubTitle>
                        {prop.music.artist}
                    </MusicSubTitle>
                </SectionTitles>
            </MusicInfor>}

            <PlayerControlPainel>

                <BtnsBackPlayNext>
                    <BtnPlayerControl onClick={e => {nextAndBack_Music(e, -1)}}>
                        <IconPlay src={istatic.iconBack()} alt="Back Music" />
                    </BtnPlayerControl>

                    {prop.buffer 
                        ? <Loading src={istatic.musicLoading()} alt='loading'/> 
                        : <BtnPlayAndPause/>}

                    <BtnPlayerControl onClick={e => {nextAndBack_Music(e, 1)}}>
                        <IconPlay src={istatic.iconNext()} alt="Next Music" />
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
                    <img src={istatic.iconLyric()} alt="Lyric" />
                </BtnLyrics>

                <BtnRepeat loop={prop.loop} onClick={()=>{handleLoop()}}>
                    <img src={istatic.iconRepeat()} alt="Repeat" />
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
                    <img src={getVolumeIconStatus()} alt="Volume Icon"/>
                </BtnIconVolume>

            </OtherSetting>
        </ViewPort>
    )
}

export default PlayerControl;