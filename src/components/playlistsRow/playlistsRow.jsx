import React, {useState, useEffect} from 'react'

import { msk_get } from 'api'

import { usePlayerContext } from 'common/contexts/Player'

import iconPlay from 'assets/icons/play_arrow_black_24dp.svg'

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHoverImg, ShadowHover,
 PlayListImg, PlayListTitle, Description} from './playlistsRowStyles'


const PlayListRow = ({ name, viewMode, listType, loadingStates }) => {

    const { load } = usePlayerContext()

    const [playListsResume, setPlaylistsResume] = useState([])

    const loadListView = ()=> {
        if(loadingStates !== undefined){
            loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: false})
        }
    }

    const startList = async(playListsKey) => {
        let listType = playListsKey.split('cs50', 1);
        let data = await msk_get('playLists', { listType: listType[0] }).then(data=> data['playListDetails']);
        load(0, data[playListsKey].musicList, playListsKey);
    }

    useEffect(() => {

        async function getData() {
            setPlaylistsResume(await msk_get('playLists', { listType: listType[0] }).then(data=> data[`playList${viewMode}`]));
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
                            to={`/playlist/${playList.keyInPlaylistDetails}`} 
                            key={index}>
                        	<PlayListImg 
                                id="PlayListImg" 
                                src={playList.playListImg}/>
                            <BtnPLayHover 
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    startList(playList.keyInPlaylistDetails)
                                }}
                                id="BtnPLayHover">
                                <BtnPLayHoverImg src={iconPlay} alt="play icon"/>
                                <ShadowHover></ShadowHover>
                            </BtnPLayHover>
                        	<section>
                        		<PlayListTitle>{playList.playListTitle}</PlayListTitle>
                        		<Description>{playList.totalMusic} Musics</Description>
                        	</section>
                        </PlayList>
                    )
                })}
            </ViewPort>
        </>
    )
}

export default PlayListRow