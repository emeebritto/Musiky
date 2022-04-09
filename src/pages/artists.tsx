import React, { useState, useEffect, useRef } from "react";
import type { NextPage } from 'next';
import axios from 'axios';
import Styled from "styled-components";
import { ArtistCard, TabTitle } from 'components';
import { IstaticBaseUrl } from 'services';
import { useSplashContext } from 'common/contexts/splash';
import { ArtistDataProps } from 'common/types';


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
const LoadNewZone = Styled.section`
    width: 40px;
    height: 40px;
`


const Artists: NextPage = () => {

    const { desableSplash } = useSplashContext();

    const [artists, setArtists] = useState<Array<ArtistDataProps>>([]);
    const [page, setPage] = useState(1);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        async function getData() {
            let list = await axios.get(`${IstaticBaseUrl}artist/all?page=${page}`)
                .then(r=>r.data.items)
                .catch(err => console.error(err));
            setArtists((artists: Array<ArtistDataProps>)=> [...artists, ...list]);
        }
        getData()
    },[page]);

    useEffect(() => {
        const node = ref?.current // DOM Ref
        if (!node) return
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setPage((currentValue) => currentValue + 1);
            }
        })
        intersectionObserver.observe(node);

        return () => intersectionObserver.disconnect();
    }, []);

    if(!!artists.length) desableSplash();


    return (
        <>
        <TabTitle name={`Musiky - Artists`}/>
        <ViewPort>
            <Wrapper>
                <TitleSection>All Artists</TitleSection>
                <ArtistsList>
                    {artists.map((artist, index) => {
                        return (
                            <ArtistCard
                                artist={artist}
                                index={index}
                                key={artist.id}
                            />
                        )
                    })}
                    <LoadNewZone ref={ref}/>
                </ArtistsList>
            </Wrapper>
        </ViewPort>
        </>
    )
}

export default Artists