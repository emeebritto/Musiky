import React, { useState, useEffect } from 'react'

import { msk_get } from 'api'

import { usePlayerContext } from 'common/contexts/Player'
import { usePlaylistContext } from 'common/contexts/Playlist'

import * as icons from 'common/iconsImports';

import {TitleSection, BoxIconPLayHover, BoxQuickPicksView, MusicOptionBox, BoxImgMusic, 
BoxNumMusic, NumMusic, DataMusic, MusicTitle, ChannelName, MusicTime} from './boxQuickPickStyles'


const BoxQuickPicks = () => {

    const { prop, load } = usePlayerContext()

    const { isPlayingIndex } = usePlaylistContext()

    const [musicList, setMusicList] = useState([])

    const id = 'quickPicksHmsk'


    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        load(targetIndex, targetList, playlistId)
    }

    useEffect(() => {

        async function getData() {
            setMusicList(await msk_get('quickPicks')
                .then(({playListDetails})=> playListDetails['mixcs5001eMeb-msk-mU51ky4'].musicList)
            )
        }
        getData()

    },[])


    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={icons.icon_playing} alt="playingNow"/>;
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>;

        let match = isPlayingIndex(id, index);

        if(!prop.playing && match) return <icons.PausedAnim/>;

        return match ? iconPlaying : duration
    }

    return (
        <>
            <TitleSection>Quick Picks</TitleSection>
            <BoxQuickPicksView>
                {musicList.map((music, index) => {
                    return (
                        <MusicOptionBox 
                            hoverOff={isPlayingIndex(id, index)} 
                            onClick={() => { clickOnMusic(index, musicList, id) }} 
                            key={music.id}
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
                                                    key={index}
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
                                <BoxIconPLayHover className="iconPlayHover" src={icons.iconPlay} alt="iconPlay" />
                            </MusicTime>
                        </MusicOptionBox>
                    )
                })}
            </BoxQuickPicksView>
        </>
    )
}

export default BoxQuickPicks