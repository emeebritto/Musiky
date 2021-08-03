import React, {useState, useEffect} from "react";

import {getPLaylists} from "../../api";
import {TitleSection, ViewPort, PlayList, PlayListImg, PlayListTitle, Description} from "./playlistsRowStyles";

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
                        <PlayList to={`playList/${playList.keyInPlaylistDetails}`} key={index}>
                        	<PlayListImg src={playList.playListImg} alt='playList img'/>
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

/*

	const playLists = [{
		img: 'https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/1.jpg',
		title: 'Mix 1',
		totalMusics: "14"},{
		img: 'https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/2.jpg',
		title: 'Mix 2',
		totalMusics: "14"},{
		img: 'https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/3.jpg',
		title: 'Mix 3',
		totalMusics: "14"},{
		img: 'https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/4.jpg',
		title: 'Mix 4',
		totalMusics: "14"},{
		img: 'https://raw.githubusercontent.com/Emerson-Britto/API-Musiky/main/dataBase/imgs/chill/5.jpg',
		title: 'Mix 5',
		totalMusics: "14"
	}]

*/