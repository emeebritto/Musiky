import React, { useState, useEffect } from 'react'

import { msk_get } from 'api'

import { usePlayerContext } from 'common/contexts/Player'
import { usePlaylistContext } from 'common/contexts/Playlist'

import { istatic } from "api/istatic";

import PausedAnim from 'assets/playingCompAnim.jsx';

import {ViewPort, TitleSection, BoxIconPLayHover, QuickPicksWrapper, MusicOptionBox, BoxImgMusic, 
BoxNumMusic, NumMusic, DataMusic, MusicTitle, ChannelName, MusicTime} from './musicListStyles'


const MusicList = () => {

    const { prop, load } = usePlayerContext();
    const { isPlayingIndex } = usePlaylistContext();
    const [musicList, setMusicList] = useState([]);

    const id = 'quickPicksHmsk';


    const clickOnMusic = (targetIndex, targetList, playlistId) => {
        load(targetIndex, targetList, playlistId);
    }

    useEffect(() => {

        async function getData() {
            let { items } = await msk_get('quickPicks');
            let { list } = await msk_get('playlist', { id: items[0].infors.playlistId });
            list.length = 10; // TEMP
            setMusicList(list);
        }
        getData()

    },[])


    //Component:
    function BoxDurationOrPLayingNow({music, index}){

        var iconPlaying = <img src={istatic.icon_playing()} alt="playingNow"/>;
        var duration = <p className="MusicTime">{music.contentDetails.duration}</p>;

        let match = isPlayingIndex(id, index);

        if(!prop.playing && match) return <PausedAnim/>;

        return match ? iconPlaying : duration
    }

    return (
        <ViewPort>
            <TitleSection>Quick Picks</TitleSection>
            <QuickPicksWrapper>
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
                                <BoxIconPLayHover className="iconPlayHover" src={istatic.iconPlay()} alt="iconPlay" />
                            </MusicTime>
                        </MusicOptionBox>
                    )
                })}
            </QuickPicksWrapper>
        </ViewPort>
    )
}

export default MusicList