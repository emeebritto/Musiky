import React, { useState, useEffect } from "react";

import { quickPicks } from "../../../api";
import iconPlay from "../../../assets/icons/play_arrow_black_24dp.svg";
import icon_playing from '../../../assets/icons/AnimatedSvg/playing.svg';

import {TitleSection, BoxIconPLayHover, BoxQuickPicks, MusicOptionBox, BoxImgMusic, 
BoxNumMusic, NumMusic, DataMusic, MusicTitle, ChannelName, MusicTime} from "./boxQuickPickStyles";


export default ({playingNow}) => {

    const [playingIndex, setPLayingIndex] = useState(null)
    const [musicList, setMusicList] = useState([])


    const clickOnMusic = (targetIndex, targetList) => {
        playingNow.startNewList(targetIndex, targetList)
        setPLayingIndex(targetIndex)
    }

    const updateIndex = (targetIndex, targetList) => {
        setPLayingIndex(targetIndex)
    }

    useEffect(() => {
        quickPicks(setMusicList);

        playingNow.subscribe(updateIndex)

        return () => {
            playingNow.unsubscribe(updateIndex)
        };

    }, [])


    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icon_playing} alt="playingNow"/>
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>

        var playing = playingIndex === index;

        return playing ? iconPlaying : duration
    }

    return (
        <>
            <TitleSection>Quick Picks</TitleSection>
            <BoxQuickPicks>
                {musicList.map((music, index) => {
                    return (
                        <MusicOptionBox hoverOff={playingIndex === index} onClick={() => { clickOnMusic(index, musicList) }} key={index}>
                            <BoxNumMusic>
                                <NumMusic>{index + 1}.</NumMusic>
                            </BoxNumMusic>
                            <DataMusic>
                                <BoxImgMusic src={music.snippet.thumbnails.medium.url} alt="imgMusic" />
                                <section>
                                    <MusicTitle>{music.snippet.title}</MusicTitle>
                                    <ChannelName>{music.snippet.channelTitle}</ChannelName>
                                </section>
                            </DataMusic>
                            <MusicTime>
                                <BoxDurationOrPLayingNow music={music} index={index}/>
                                <BoxIconPLayHover className="iconPlayHover" src={iconPlay} alt="iconPlay" />
                            </MusicTime>
                        </MusicOptionBox>
                    )
                })}
            </BoxQuickPicks>
        </>
    )
}
