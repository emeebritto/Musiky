import React, {useState, useEffect} from 'react'

import { msk_get } from 'api'

import { usePlayerContext } from 'common/contexts/Player'

import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHoverImg, ShadowHover,
 PlayListImg, PlayListTitle, Description} from './playlistsRowStyles'


const PlayListRow = ({ name, type, loadingStates }) => {

    const { load } = usePlayerContext()

    const [playListsResume, setPlaylistsResume] = useState([])

    const loadListView = ()=> {
        if(loadingStates !== undefined){
            loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: false})
        }
    }

    const startList = async(playlistId) => {
        let playlist = await msk_get('playlist', { id: playlistId });
        load(0, playlist.list, playlistId);
    }

    useEffect(() => {

        async function getData() {
            let { items } = await msk_get('randomPlaylists', { type })
            
            setPlaylistsResume(items);
            if(loadingStates !== undefined){
                loadingStates.setSplash(false);
                loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: true});
            };
        }
        getData();

    },[])
    
    return (
        <>
            <TitleSection>{name}</TitleSection>
            <ViewPort>
                {playListsResume.map((playList, index) => {
                    return (
                        <PlayList 
                            onClick={()=> loadListView()} 
                            to={`/playlist/${playList.infors.playlistId}`} 
                            key={index}>
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
                                <BtnPLayHoverImg src={iconPlay} alt="play icon"/>
                                <ShadowHover></ShadowHover>
                            </BtnPLayHover>
                        	<section>
                        		<PlayListTitle>{playList.infors.title}</PlayListTitle>
                        		<Description>{playList.infors.length} Musics</Description>
                        	</section>
                        </PlayList>
                    )
                })}
            </ViewPort>
        </>
    )
}

export default PlayListRow