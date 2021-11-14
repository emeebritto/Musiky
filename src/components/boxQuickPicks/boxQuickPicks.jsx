import React, { useState, useEffect } from 'react';
import Styled from "styled-components";

import { msk_get } from 'api';

import { MusicList } from 'components';


const ViewPort = Styled.section`
    width: 81%;
`

const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin-bottom: 16px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    @media(max-width: 900px) {
        margin-left: 18px;
        margin-bottom: 23px;
    }

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`

const MusicListWrapper = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 75vw;
    height: 260px;
    overflow: scroll;
    margin: 0 auto;

    ::-webkit-scrollbar {
        width: 0;
    } 
`


const BoxQuickPicks = () => {

    const [musicList, setMusicList] = useState([]);
    const [id, setId] = useState('');


    useEffect(() => {

        async function getData() {
            let { items } = await msk_get('quickPicks');

            setId(items[0].infors.playlistId);

            let { list } = await msk_get('playlist', { id: items[0].infors.playlistId });
            list.length = 10; // TEMP
            setMusicList(list);
        }
        getData()

    },[])

    return (
        <ViewPort>
            <TitleSection>Quick Picks</TitleSection>
            <MusicListWrapper>
                <MusicList list={musicList} listId={id}/>
            </MusicListWrapper>
        </ViewPort>
    )
}

export default BoxQuickPicks