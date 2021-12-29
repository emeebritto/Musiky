import React, { useState, useEffect } from "react";
import Link from 'next/link';
import Styled from "styled-components";

import { VerticalView, ArtistCard } from 'components';
import { msk_get } from 'api';


const ArtistsProfile = Styled.section`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    height: 295px;
    margin-bottom: 15px;

    ::-webkit-scrollbar {
        width: 0;
    }  

`

interface ArtistRowProps {
    maxResult: number;
}

const ArtistsRow: React.FC<ArtistRowProps> = ({ maxResult }) => {

    const [artists, setArtists] = useState([])

    useEffect(() => {

        async function getData() {
            let { artists } = await msk_get('randomArtists', { maxResult })
            setArtists(artists)
        }
        getData()

    },[])
    
    return (
        <VerticalView viewLabel="Artists" btnOption={{
            displayName: "SEE ALL",
            href: '/artists'
        }}>
            <ArtistsProfile>
                {artists.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index} key={index}/>
                    )
                })}
            </ArtistsProfile>
        </VerticalView>
    )
}

export default ArtistsRow