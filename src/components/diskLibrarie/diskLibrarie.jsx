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
    background-color: ;
    flex-direction: column;
    width: 150px;
    height: 220px;
    transition: 100ms;

`
const DiskImg = Styled.img`
	border-radius: 360px;
	width: 150px;
    height: 150px;
    margin-bottom: 15px;
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

export default ({ name }) => {

	const [disksList, setDisksList] = useState([])

    useEffect(() => {
        getDiskList(setDisksList);
    }, [])

	return(
		<>
			<TitleSection>{name}</TitleSection>
			<ViewPort>
                {disksList.map((disk, index) => {
                    return (
                        <Disk key={index}>
                        	<DiskImg id="PlayListImg" src={disk.snippet.thumbnails.medium.url} alt='disk image'/>
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
