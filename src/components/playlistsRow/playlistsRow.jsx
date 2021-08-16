import React, {useState, useEffect} from "react";

import {getPLaylists} from "../../api";

import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg"

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHoverImg,
 PlayListImg, PlayListTitle, Description} from "./playlistsRowStyles";

const PlayListRow = ({ name, viewMode, listType, loadingStates }) => {

    const [playListsResume, setPlaylistsResume] = useState([])

    const loadList = ()=> loadingStates.pagLoading({loadingBar: true, contentLoaded: false})

    useEffect(() => {

        async function getData() {
            setPlaylistsResume(await getPLaylists(viewMode, listType))
            if(loadingStates != undefined){
                loadingStates.appLoading(false)
                loadingStates.pagLoading({loadingBar: true, contentLoaded: true})
            }
        }
        getData()

    }, [])

    return (
        <>
            <TitleSection>{name}</TitleSection>
            <ViewPort>
                {playListsResume.map((playList, index) => {
                    return (
                        <PlayList 
                            onClick={()=> loadList()} 
                            to={`/playList/${playList.keyInPlaylistDetails}`} 
                            key={index}
                            >
                            <BtnPLayHover id="BtnPLayHover">
                            	<BtnPLayHoverImg src={iconPlay} alt="play icon"/>
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