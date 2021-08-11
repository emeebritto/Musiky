import React, {useState, useEffect} from "react";

import {getPLaylists} from "../../api";

import iconPlay from "../../assets/icons/play_arrow_black_24dp.svg"

import {TitleSection, ViewPort, PlayList, BtnPLayHover, BtnPLayHoverImg,
 PlayListImg, PlayListTitle, Description} from "./playlistsRowStyles";

const PlayListRow = ({ name }) => {

    const [playListsResume, setPlaylistsResume] = useState([])

    useEffect(() => {

        async function getData() {
            let resume = await getPLaylists('playListResume')
            setPlaylistsResume(resume)
        }
        getData()

    }, [])

    return (
        <>
            <TitleSection>{name}</TitleSection>
            <ViewPort>
                {playListsResume.map((playList, index) => {
                    return (
                        <PlayList to={`/playList/${playList.keyInPlaylistDetails}`} key={index}>
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