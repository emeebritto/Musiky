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
    position: relative;
    display: flex;
    text-decoration: none;
    justify-content: space-around;
    background-color: ;
    flex-direction: column;
    width: 150px;
    height: 220px;
    transition: 100ms;

    :hover {
    	cursor: pointer;
    	transform: translateY(-5px);
    }

    :hover #BtnPLayHover {
        display: inline-block;
    }

`
export const BtnPLayHover = Styled.button`
    display: none;
    border: none;
    position: absolute;
    background-color: #131313;
    width: 40px;
    height: 40px;
    top: 105px;
    left: 97px;
    border-radius: 19px;
    box-shadow: 5px 5px 30px black;
`
export const BtnPLayHover_img = Styled.img`
    width: 100%;
    margin-top: 2px;
    filter: invert(100%);
`

export const PlayListImg = Styled.img`
	border-radius: 10px;
	width: 150px;
    height: 150px;
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
