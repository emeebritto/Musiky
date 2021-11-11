import React, { useState, useEffect } from "react";
import Styled from "styled-components";

import ArtistCard from '../artistCard';

import { msk_get } from 'api';

import { scroll } from 'controllers';
import { Link } from 'react-router-dom';


const ViewPort = Styled.section`
    margin-bottom: 30px;
`

const TitleAndBtnExplore = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #100F0F;
    margin-bottom: 25px;

    @media(max-width: 505px) {
        border-bottom: 3px solid #100F0F;
    }
`
const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    @media(max-width: 900px) {
        margin-left: 18px;
    }

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`
const BtnField = Styled.section`
    position: relative;

    :hover #hoverLine {
        opacity: 100%;
        transform: scaleX(11);
    }

    @media(max-width: 900px) {
        margin-right: 18px;
    }

    @media(max-width: 545px) {
        transform: scale(0.85);
        top: 2px;
    }
`
const BtnFindOthers = Styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-size: 1.1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: none;
    color: white;
`
const BtnHoverLine = Styled.section`
    position: absolute;
    background-color: white;
    opacity: 0;
    left: 40px;
    top: 20px;
    height: 2px;
    width: 5px;
    transition: 500ms;
`
const ArtistsProfile = Styled.section`
    display: flex;
    align-items: center;
    overflow: scroll;
    height: 275px;
    margin-bottom: 15px;

    ::-webkit-scrollbar {
        width: 0;
    }  

`


const ArtistsRow = ({ maxResult }) => {

    const [artists, setArtists] = useState([])

    useEffect(() => {

        async function getData() {
            let { artists } = await msk_get('randomArtists', { maxResult })
            setArtists(artists)
        }
        getData()

    },[])
    
    return (
        <ViewPort>  
            <TitleAndBtnExplore>
                <TitleSection>Artists</TitleSection>
                <BtnField>
                    <BtnFindOthers 
                        tabIndex='1' 
                        onClick={()=> scroll.toTop()} 
                        to='/artists'>Find Others</BtnFindOthers>
                    <BtnHoverLine id='hoverLine'/>
                </BtnField>
            </TitleAndBtnExplore>
            <ArtistsProfile>
                {artists.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index} key={index}/>
                    )
                })}
            </ArtistsProfile>
        </ViewPort>
    )
}

export default ArtistsRow