import React, {useState, useEffect} from "react"
import Styled from 'styled-components'

import { msk_get } from "api";

import { usePlayerContext } from 'common/contexts/Player';

const ViewPort = Styled.section`
`

const DiskWrapper = Styled.section`
    display: flex;
    align-items: center;
    height: 260px;
    overflow: scroll;
    margin-bottom: 30px;
`
const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin: 0 0 16px 18px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    @media(max-width: 900px) {
        margin-left: 18px;
        margin-bottom: 23px;
    }

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`
const Disk = Styled.section`
    display: flex;
    flex-direction: column;
    width: 150px;
    height: 230px;
    margin: 0 15px;

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


const DiskLibrary = ({ name, totalSongs, type, player, loadingStates }) => {

    const { load, isPlayingId } = usePlayerContext();

	const [disksList, setDisksList] = useState([]);


    useEffect(() => {

        async function getData() {
            setDisksList(await msk_get('songsList', { maxResult: totalSongs, type }))
            if(loadingStates!==undefined){
                loadingStates.setSplash(false)
                loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: true})
            }
        }
        getData();

    },[]);


	return(
		<ViewPort>
			<TitleSection>{name}</TitleSection>
			<DiskWrapper>
                {disksList.map((disk, index) => {
                    return (
                        <Disk onClick={() => load(index, disksList) } key={disk.id}>
                            <DiskImg 
                                playing={isPlayingId(disk.id)} 
                                id={isPlayingId(disk.id) ? '' : 'diskImg'}
                                style={{ background: `url(${disk.snippet.thumbnails.medium.url}) no-repeat center/177.5%`}} 
                                alt='disk image'
                                >
                                <CenterHole/>
                            </DiskImg>
                        	<section>
                        		<DiskTitle>{disk.snippet.title}</DiskTitle>
                        		<DiskTotalTime>{disk.contentDetails.duration}</DiskTotalTime>
                        	</section>
                        </Disk>
                    )
                })}
			</DiskWrapper>
		</ViewPort>
	)
}

export default DiskLibrary