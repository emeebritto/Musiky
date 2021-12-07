import React, { useEffect, useState } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import Styled from "styled-components";
import { ArtistDataProps, Music, PlaylistProps } from 'common/types';
import { msk_get } from 'api';
import { istatic } from "api/istatic";

import { formatValues } from 'common/scripts/formatNum';
import { usePlayerContext } from 'common/contexts/Player';
import { MusicList } from 'components';


import {
    PlayList, 
    BtnPLayHover, 
    BtnPLayHoverImg, 
    ShadowHover,
    PlayListImg, 
    PlayListTitle, 
    Description
} from 'components/playlistsRow/playlistsRowStyles';


const ViewPort = Styled.section`
    overflow-y: scroll;
    width: 100%;
    height: 100vh;
`

const Wrapper = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 15vh 0 10vh 0;

    @media(max-width: 900px) {
        margin-top: 16vh;
    }
`

const ArtistInfor = Styled.section`
    display: flex;
    align-items: center;
`

const ArtistImg = Styled.img`
    border-radius: 15%;
    width: 185px;
    height: 185px;
`

const ArtistData = Styled.section`
    margin: 0 30px;
`

const ArtistName = Styled.h1`
    color: #fff;
    height: 30px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.7em;
`

const FollowesCounter = Styled.p`
    color: #7B7D83;
    height: 30px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
    margin: 10px 0 0 0;
`

const BrnFollow = Styled.button`
    border: none;
    background-color: rgb(0 0 0 /30%);
    border-radius: 16px;
    border: 1px solid #fff;
    cursor: pointer;
    color: #fff;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.3em;
    padding: 5px 30px;
    transition: 300ms;

    :hover {
        background-color: #fff;
        color: black;
    }
`

const WrapperGenres = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
`

const Genre = Styled.p`
    padding: 5px 10px;
    background-color: #181B20;
    border-radius: 10px;
    margin: 30px 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

const Hr = Styled.hr`
    margin: 30px 0;
    width: 50%;
    opacity: 20%;
`

const Listen = Styled.section`
    display: flex;
`

const MusicListWrapper = Styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 40vw;
    height: auto;
    overflow: scroll;
    margin: 0 auto;

    ::-webkit-scrollbar {
        width: 0;
    } 
`

export const PlaylistWrapper = Styled.section`
    display: flex;
    flex-direction: column;
    width: 20vw;
    align-items: center;

    ::-webkit-scrollbar {
        width: 0;
    }   
`

interface ArtistPageProps {
    resAPI: {
        artistData: ArtistDataProps;
        musics: Array<Music>;
        playlists: Array<PlaylistProps>;
        requestId: string;
    }
}

const Artist: NextPage<ArtistPageProps> = ({ resAPI }) => {

    const { load } = usePlayerContext();

    const {artistData, musics, playlists, requestId} = resAPI;

    const startList = async(playlistId: string): Promise<void> => {
        let playlist = await msk_get('playlist', { id: playlistId });
        load(0, playlist.list, playlistId);
    }

    return (
        <ViewPort>
            <Wrapper>
                <ArtistInfor>
                    <ArtistImg 
                        src={artistData.images.length 
                            ? artistData.images[1].url 
                            : undefined} 
                        alt='NULL' />
                    <ArtistData>
                        <ArtistName>{artistData.name}</ArtistName>
                        <FollowesCounter>{formatValues(artistData.followers.total)}</FollowesCounter>
                    </ArtistData>
                    <BrnFollow>Follow</BrnFollow>
                </ArtistInfor>
                <WrapperGenres>
                    {artistData.genres.map((genre, i)=>{
                        return (
                            <Genre key={i}>{genre}</Genre>
                        )
                    })}
                </WrapperGenres>
                <Hr/>
                <Listen>
                    <MusicListWrapper>
                        <MusicList list={musics} listId={requestId}/>
                    </MusicListWrapper>
                    {playlists.length > 0 &&
                    <PlaylistWrapper>
                        {playlists.map((playList, index) => {
                            return (
                                <Link 
                                    href={`/playlist/${playList.infors.playlistId}`}
                                    key={index}>
                                    <PlayList>
                                        <PlayListImg 
                                            id="PlayListImg" 
                                            src={playList.infors.img}/>
                                        <BtnPLayHover 
                                            onClick={e => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                startList(playList.infors.playlistId)
                                            }}
                                            id="BtnPLayHover">
                                            <BtnPLayHoverImg src={istatic.iconPlay()} alt="play icon"/>
                                            <ShadowHover></ShadowHover>
                                        </BtnPLayHover>
                                        <section>
                                            <PlayListTitle>{playList.infors.title}</PlayListTitle>
                                            <Description>{playList.infors.length} Musics</Description>
                                        </section>
                                    </PlayList>
                                </Link>
                            )
                        })}
                    </PlaylistWrapper>}
                </Listen>
            </Wrapper>
        </ViewPort>
    )
}

export default Artist

export const getServerSideProps: GetServerSideProps = async(context) => {

    let q: string | string[] | undefined = context?.params?.id;
    let resAPI = await msk_get('artist', { q });

    return {
        props: { resAPI }, // will be passed to the page component as props
    }
}
