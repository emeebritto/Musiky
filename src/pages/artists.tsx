import React, { useState, useEffect } from "react";
import type { NextPage } from 'next';
import axios from 'axios';
import Styled from "styled-components";

import { ArtistCard } from 'components';
import { BaseUrl } from 'api';

import { useSplashContext } from 'common/contexts/splash';


const ViewPort = Styled.section`
    display: flex;
    width: 96.33vw;
    overflow-y: scroll;
    height: 100vh;

    @media(max-width: 545px) {
        margin-top: 15vh;
        width: 95%;
    }
`

const Wrapper = Styled.section`
    width: 85%;
    margin: 0 auto;
    padding: 15vh 0;
`

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

export const ArtistsList = Styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`



const Artists: NextPage = () => {

    const { desableSplash } = useSplashContext();

    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function getData() {
            let list = await axios.get(`${BaseUrl}/artist/getArtistsPerPage?page=20`)
                .then(r=>r.data)
                .catch(err => console.error(err));
            setArtists(list);
        }
        getData()
    },[])

    if(!!artists.length) desableSplash();


    return (
        <ViewPort>
            <Wrapper>
                <TitleSection>All Artists</TitleSection>
                <ArtistsList>
                    {artists.map((artist, index) => {
                        return (
                            <ArtistCard artist={artist} index={index}/>
                        )
                    })}
                </ArtistsList>
            </Wrapper>
        </ViewPort>
    )
}

export default Artists