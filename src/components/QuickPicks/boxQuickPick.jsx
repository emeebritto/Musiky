import React, { useState, useEffect } from 'react'

import { quickPicks } from 'api'

import { player } from 'controllers'

import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'
import PausedAnim from 'assets/icons/AnimatedSvg/playingCompAnim'
import icon_playing from 'assets/icons/AnimatedSvg/playing.svg'

import {TitleSection, BoxIconPLayHover, BoxQuickPicksView, MusicOptionBox, BoxImgMusic, 
BoxNumMusic, NumMusic, DataMusic, MusicTitle, ChannelName, MusicTime} from './boxQuickPickStyles'


const BoxQuickPicks = () => {

    const [playingIndex, setPLayingIndex] = useState(null)
    const [status, setStatus] = useState(false)
    const [musicList, setMusicList] = useState([])

    const id = 'quickPicksHmsk'


    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        player.load(targetIndex, targetList, playlistId)
    }

    const updateIndexQuickPicks = ({indexOnPlaylist, playing}) => {
        if(player.props.playlistId === id) {
            setPLayingIndex(indexOnPlaylist)
            setStatus(playing)
        }
    }

    useEffect(() => {

        quickPicks(setMusicList);
        player.subscribe(updateIndexQuickPicks)

    },[])


    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icon_playing} alt="playingNow"/>
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>

        var match = playingIndex === index;
        var playing = status

        if(!playing && match){return <PausedAnim/>}

        return match ? iconPlaying : duration
    }

    return (
        <>
            <TitleSection>Quick Picks</TitleSection>
            <BoxQuickPicksView>
                {musicList.map((music, index) => {
                    return (
                        <MusicOptionBox 
                            hoverOff={playingIndex === index} 
                            onClick={() => { clickOnMusic(index, musicList, id) }} 
                            key={index}
                            >
                            <BoxNumMusic>
                                <NumMusic>{index + 1}.</NumMusic>
                            </BoxNumMusic>
                            <DataMusic>
                                <BoxImgMusic src={music.snippet.thumbnails.medium.url} alt="imgMusic" />
                                <section>
                                    <MusicTitle>{music.snippet.title}</MusicTitle>
                                    <section>
                                        {music.Artist.map((artist, index) => {
                                            let space='';
                                            if(index > 0){ space = ',  ' }
                                            return(
                                                <ChannelName 
                                                    to={`/artist/${artist.replaceAll(' ', '_')}`}
                                                    onClick={(e)=>{e.stopPropagation()}}
                                                    >
                                                    {space + artist}
                                                </ChannelName>
                                            )
                                        })}
                                    </section>
                                </section>
                            </DataMusic>
                            <MusicTime>
                                <BoxDurationOrPLayingNow music={music} index={index}/>
                                <BoxIconPLayHover className="iconPlayHover" src={iconPlay} alt="iconPlay" />
                            </MusicTime>
                        </MusicOptionBox>
                    )
                })}
            </BoxQuickPicksView>
        </>
    )
}

export default BoxQuickPicks