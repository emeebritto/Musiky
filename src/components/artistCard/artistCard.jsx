import React from "react";

import Styled from "styled-components";
import { Link } from 'react-router-dom'

const Artist = Styled(Link)`
    position: relative;
    display: flex;
    text-align: center;
    text-decoration: none;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    width: 150px;
    margin: 10px 15px;
`
const ArtistImg = Styled.img`
    border-radius: 100px;
    width: 155px;
    height: 155px;
    margin-bottom: 15px;

    @media(max-width: 545px) {
        width: 125px;
        height: 125px;
    }
`

const ArtistName = Styled.h1`
    color: white;
    height: 30px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
    margin: 0px 0px 15px 5px;

    @media(max-width: 545px) {
        font-size: 1.0em;
    }
`
const BrnFollow = Styled.button`
    background-color: rgb(0 0 0 /30%);
    border-radius: 16px;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
    padding: 5px 15px;
    transition: 500ms;

    :hover {
        background-color: white;
        color: black;
    }

    @media(max-width: 545px) {
        font-size: 0.9em;
    }
`


const ArtistCard = ({ artist, index }) => {

    return (
        <Artist to={`/404`} key={index}>
            <ArtistImg
                src={artist.img}
                alt='artist img'
                />
                <ArtistName>{artist.name}</ArtistName>
                <BrnFollow>Follow</BrnFollow>
        </Artist>
    )
}

export default ArtistCard