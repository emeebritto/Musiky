import React, { useState, useEffect } from "react";
import Styled from "styled-components";

import { ArtistCard } from 'components';

import { msk_get } from 'api';


export const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-bottom: 45px;

    @media(max-width: 545px) {
        margin-left: 20px;
        width: 95%;
    }
`
const ViewPort = Styled.section`
    margin-top: 17vh;
    width: 80%;
    margin-bottom: 17vh;

    @media(max-width: 545px) {
        margin-top: 15vh;
        width: 95%;
    }
`

export const Artists = Styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`


const ArtistsList = ({ loadingStates }) => {

    const [artists, setArtists] = useState([]);


    useEffect(() => {

        async function getData() {
            let list = await msk_get('getArtists');
            setArtists(list);

            if(loadingStates !== undefined){
                loadingStates.setSplash(false);
                loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: true});
            }
        }
        getData()

    },[])


    return (
        <ViewPort>
            <TitleSection>All Artists</TitleSection>
            <Artists>
                {artists.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index}/>
                    )
                })}
            </Artists>
        </ViewPort>
    )
}

export default ArtistsList