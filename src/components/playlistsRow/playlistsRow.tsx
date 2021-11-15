import React, {useState, useEffect} from 'react';
import { AppProps } from 'next/app';
import Link from 'next/link';

import { msk_get } from 'api';

import { usePlayerContext } from 'common/contexts/Player';

import { istatic } from "api/istatic";

import {
    ViewPort, 
    TitleSection, 
    PlaylistWrapper, 
    PlayList, 
    BtnPLayHover, 
    BtnPLayHoverImg, 
    ShadowHover,
    PlayListImg, 
    PlayListTitle, 
    Description
} from './playlistsRowStyles';


const PlayListRow: React.FC<AppProps> = ({ name }) => {

    const { load } = usePlayerContext()

    const [playListsResume, setPlaylistsResume] = useState([])

    const startList = async(playlistId) => {
        let playlist = await msk_get('playlist', { id: playlistId });
        load(0, playlist.list, playlistId);
    }

    useEffect(() => {

        async function getData() {
            let { items } = await msk_get('randomPlaylists', { label: name })
            
            setPlaylistsResume(items);
        }
        getData();

    },[])
    
    return (
        <ViewPort>
            <TitleSection>{name}</TitleSection>
            <PlaylistWrapper>
                {playListsResume.map((playList, index) => {
                    return (
                        <Link 
                            href={`/playlist/${playList.infors.playlistId}`}
                            key={index}>
                            <PlayList>
                            	<PlayListImg 
                                    id="PlayListImg" 
                                    src={playList.infors.img}/>
                                <BtnPLayHover 
                                    onClick={e => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        startList(playList.infors.playlistId)
                                    }}
                                    id="BtnPLayHover">
                                    <BtnPLayHoverImg src={istatic.iconPlay()} alt="play icon"/>
                                    <ShadowHover></ShadowHover>
                                </BtnPLayHover>
                            	<section>
                            		<PlayListTitle>{playList.infors.title}</PlayListTitle>
                            		<Description>{playList.infors.length} Musics</Description>
                            	</section>
                            </PlayList>
                        </Link>
                    )
                })}
            </PlaylistWrapper>
        </ViewPort>
    )
}

export default PlayListRow