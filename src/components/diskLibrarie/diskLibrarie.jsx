import React, {useState, useEffect} from "react"
import Styled from 'styled-components'

import { getDiskList } from "../../api";

const ViewPort = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-top: 30px;
	margin-bottom: 40px;
`
const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
`
const Disk = Styled.section`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 230px;

    :hover {
    	cursor: pointer;
    }

    :hover #diskImg {
    	transform: rotate(360deg);
    }
`
const DiskImg = Styled.section`
    position: relative;
	border-radius: 360px;
	width: 150px;
    height: 150px;
    margin-bottom: 15px;
    transition: 400ms;
    animation: ${(props)=> (props.playing ? "spin infinite 30s linear" : '')};

    @keyframes spin {
	  to {
	    transform: rotate(360deg);
	  }
    }
`
const CenterHole = Styled.section`
    position: absolute;
	border-radius: 360px;
	width: 20px;
    height: 20px;
    background-color: black;
    top: 65px;
    left: 65px;
`
const DiskTitle = Styled.h1`
	color: white;
	width: 130px;
	height: 34px;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	font-size: 1.1em;
	margin: 0px 0px 5px 5px; 
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 10px;
`
const DiskTotalTime = Styled.p`
	color: white;
	color: rgb(255 255 255/ 65%);
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin-left: 5px;
`


const DiskLibrarie = ({ name, player }) => {

    const [playingIndex, setPLayingIndex] = useState(null)
	const [disksList, setDisksList] = useState([])

    const id = 'diskList-LongSongsHmsk'

    const clickOnMusic = (targetIndex, targetList, playlistId) => {
    	setPLayingIndex(targetIndex);
        player.load(targetIndex, targetList, playlistId)
    }

    const updateIndex = targetIndex => {
        if(player.playingInplaylist === id) {
            setPLayingIndex(targetIndex)
        }
    }

    useEffect(() => {
        getDiskList(setDisksList);

        player.setPlaylistFunction(updateIndex)
    }, [])



    //Component:
    function DiskImgComponent({disk, index}){

    	var playing = playingIndex === index;

    	return(
            <DiskImg 
                playing={playing} 
                id={playing ? '' : 'diskImg'}
                style={{ background: `url(${disk.snippet.thumbnails.medium.url}) no-repeat center/175%`}} 
                alt='disk image'
                >
        		<CenterHole/>
        	</DiskImg>
    	)
    }

	return(
		<>
			<TitleSection>{name}</TitleSection>
			<ViewPort>
                {disksList.map((disk, index) => {
                    return (
                        <Disk onClick={() => { clickOnMusic(index, disksList, id) }} key={index}>
                            <DiskImgComponent disk={disk} index={index}/>
                        	<section>
                        		<DiskTitle>{disk.snippet.title}</DiskTitle>
                        		<DiskTotalTime>{disk.contentDetails.duration}</DiskTotalTime>
                        	</section>
                        </Disk>
                    )
                })}
			</ViewPort>
		</>
	)
}

export default DiskLibrarie