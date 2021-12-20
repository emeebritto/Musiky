import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

import { useLyricContext } from 'common/contexts/Lyric';


const ViewPort = Styled.section`
    position: fixed;
    left: 0;
    width: 99.4vw;
    height: 100vh;
    z-index: 2;
    background-color: #000;
`

const Fade = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 99.4vw;
    height: 100vh;
    background-color: #000;
    opacity: 0.9;
`

const Lyrics = Styled.p`
    width: 60%;
    text-align: center;
    margin-left: 30px;
    font-size: 2.3em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

const LirycScreen: React.FC = () => {

    const { lyricProp } = useLyricContext();

    return(
        <>
        {lyricProp.showLyrics &&
            <ViewPort style={{background: `url() no-repeat center/100%`}}>
                <Fade>
                    <Lyrics>{ lyricProp.currentLine }</Lyrics>
                </Fade>
            </ViewPort>
        }
        </>
    )
}

export default LirycScreen;