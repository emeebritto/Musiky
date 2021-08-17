import React, {useState, useEffect} from "react";

import {getPLaylists} from "../../api";

import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg"

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHoverImg, ShadowHover,
 PlayListImg, PlayListTitle, Description} from "./playlistsRowStyles";


const PlayListRow = ({ name, player, viewMode, listType, loadingStates }) => {

    const [playListsResume, setPlaylistsResume] = useState([])

    const loadListView = ()=> {
        if(loadingStates !== undefined){
            loadingStates.pagLoading({loadingBar: true, contentLoaded: false})
        }
    }

    const startList = async(playListsKey) => {
        let listType = playListsKey.split('cs50', 1)
        let data = await getPLaylists('Details', listType[0])
        player.load(0, data[playListsKey].musicList, playListsKey)
    }

    useEffect(() => {

        async function getData() {
            setPlaylistsResume(await getPLaylists(viewMode, listType))
            if(loadingStates !== undefined){
                loadingStates.appLoading(false)
                loadingStates.pagLoading({loadingBar: true, contentLoaded: true})
            }
        }
        getData()

    },[])
    
    return (
        <>
            <TitleSection>{name}</TitleSection>
            <ViewPort>
                {playListsResume.map((playList, index) => {
                    return (
                        <PlayList 
                            onClick={()=> loadListView()} 
                            to={`/playList/${playList.keyInPlaylistDetails}`} 
                            key={index}
                            >
                            <BtnPLayHover 
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    startList(playList.keyInPlaylistDetails)
                                }}
                                id="BtnPLayHover"
                                >
                            	<BtnPLayHoverImg src={iconPlay} alt="play icon"/>
                                <ShadowHover></ShadowHover>
                            </BtnPLayHover>
                        	<PlayListImg id="PlayListImg" src={playList.playListImg} alt='playList img'/>
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