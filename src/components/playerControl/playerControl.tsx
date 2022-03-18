import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import { EventTarget, SyntheticEvent } from 'common/types';
import { usePlayer } from 'common/contexts/player';
import { useLyricContext } from 'common/contexts/Lyric';
import { PlayerProgressControl } from 'components';
import { istatic } from "api/istatic";
import {
  ViewPort, MusicInfor, OtherSetting, MusicImg, 
  SectionTitles, MusicTitleInControl, MusicSubTitle, 
  ControlPainelWrapper, BtnPlayerControl, IconPlay, VolumeControl,
  BtnIconVolume, BtnLyrics, BtnRepeat
} from './playerStyles';

const OpenVideo = Styled.img`
  transform: rotate(-180deg);
  width: 30px;
  opacity: 0.8;
  margin-left: 5px;
`

const PlayerControl: React.FC = () => {
  const router = useRouter();

  const {
    prop,
    toggleLoop,
    changeVolumeTo,
    toggleMuted
  } = usePlayer();
  const { lyricProp, toggleLyrics } = useLyricContext();

  const IsAllowed = prop.mode['only_audio'];

  const handlelyrics = (): void => {
    toggleLyrics();
  }
  const handlelyricsMobile = (e: React.SyntheticEvent<EventTarget>): void => {
    if(window.innerWidth < 570){
      toggleLyrics();
    }
  }
  const handleLoop = (): void => {
    toggleLoop();
  }
  const handleVolumeChange = (e: React.SyntheticEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    changeVolumeTo(parseFloat(target.value));
  }
  const handleToggleMuted = (): void => {
    toggleMuted();
  }

  function getVolumeIconStatus() {
    if(prop.muted) return istatic.iconVolumeOff()
    if(prop.volume < 0.4) return istatic.iconVolumeDown()
    return istatic.iconVolume()
  }

  return (
    <ViewPort
      onClick={e =>{handlelyricsMobile(e)}}
      style={{ display: `${prop.music && IsAllowed ? '' : 'none'}`}}
      >
      {prop.music &&
        <MusicInfor
          onClick={()=> {
            if (!prop.music) return;
            router.push({
              pathname: '/watch',
              query: {
                v: prop.music.id
              }
            }, undefined, { shallow: true, scroll: false });
          }}
        >
          <MusicImg 
            src={prop.music.thumbnails[1].url}
            alt="musicImg"
            />
          <SectionTitles>
            <MusicTitleInControl>
              {prop.music.title}
            </MusicTitleInControl>
            <MusicSubTitle>
              {prop.music.artists.map((artist, index) => {
                let space='';
                if(index > 0){ space = ',  ' }
                return(
                  <p key={index}>
                    {space + artist}
                  </p>
                )
              })}
            </MusicSubTitle>
          </SectionTitles>
          <OpenVideo
            src={istatic.arrow_white()}
            alt='open video'
          />
        </MusicInfor>
      }
      <ControlPainelWrapper>
        <PlayerProgressControl/>
      </ControlPainelWrapper>
      <OtherSetting>
        {lyricProp.hasLyric &&
        <BtnLyrics
          lyrics={lyricProp.showLyrics}
          onClick={()=> handlelyrics()}
        >
          <img src={istatic.iconLyric()} alt="Lyric" />
        </BtnLyrics>}

        <BtnRepeat
          loop={prop.loop}
          onClick={()=>{handleLoop()}}
        >
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