import React from 'react';
import type { NextPage } from 'next';
import Styled from "styled-components";

import { PlaylistsRow, DiskLibrary } from 'components';


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


const Explore: NextPage = () => {

    return (
        <ViewPort>
            <Wrapper>
                <PlaylistsRow 
                    name='Explore List'/>
                <DiskLibrary 
                    name='long Songs | Ambient' 
                    totalSongs={6} 
                    type='ambienceSongs'/>
                <PlaylistsRow 
                    name='Explore new Sets'/>                   
            </Wrapper>
        </ViewPort>
    )
}

export default Explore
