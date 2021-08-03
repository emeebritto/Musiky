import Styled from "styled-components";
import { Link } from 'react-router-dom'

export const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif
`

export const ViewPort = Styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 250px;
    margin-bottom: 10px;
`
export const PlayList = Styled(Link)`
    display: flex;
    text-decoration: none;
    justify-content: space-around;
    background-color: ;
    flex-direction: column;
    width: 150px;
    height: 220px;
    transition: 100ms;

    :hover{
    	cursor: pointer;
    	transform: translateY(-5px);
    }
`
export const PlayListImg = Styled.img`
	border-radius: 10px;
	width: 100%;
`

export const PlayListTitle = Styled.h1`
	color: white;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	font-size: 1.2em;
	margin: 0px 0px 5px 5px; 
`

export const Description = Styled.p`
	color: white;
	color: rgb(255 255 255/ 65%);
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin-left: 5px;
`

