import React from 'react';
import Styled from "styled-components";
import { Music } from 'common/types';
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
    overflow-y: hidden;
    margin: 0 auto;

    ::-webkit-scrollbar {
        width: 0;
    } 
`

interface QuickPicksProps {
    data: {
        id: string;
        list: Array<Music>
    };
}


const BoxQuickPicks: React.FC<QuickPicksProps> = ({ data }) => {

    return (
        <ViewPort>
            <TitleSection>Quick Picks</TitleSection>
            <MusicListWrapper>
                <MusicList list={data.list} listId={data.id}/>
            </MusicListWrapper>
        </ViewPort>
    )
}

export default BoxQuickPicks