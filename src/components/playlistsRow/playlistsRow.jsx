import React, {useState, useEffect} from "react";

import {getPLaylists} from "../../api";

import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg"

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHover_img,
 PlayListImg, PlayListTitle, Description} from "./playlistsRowStyles";

export default () => {

    const [playListsResume, setPlaylistsResume] = useState([])

    useEffect(async() => {
    	let resume = await getPLaylists('playListResume')
    	setPlaylistsResume(resume)    		
    }, [])

    return (
        <>
            <TitleSection>MIXs</TitleSection>
            <ViewPort>
                {playListsResume.map((playList, index) => {
                    return (
                        <PlayList to={`/playList/${playList.keyInPlaylistDetails}`} key={index}>
                            <BtnPLayHover id="BtnPLayHover">
                            	<BtnPLayHover_img src={iconPlay} alt="play icon"/>
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

