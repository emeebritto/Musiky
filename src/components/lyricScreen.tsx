import React, { useState } from "react";
import Styled from "styled-components";

import { useLyricContext } from "common/contexts/Lyric";
import { DefinitionFromDictionary } from "components";


const ViewPort = Styled.section`
    position: fixed;
    left: 0;
    width: 99.4vw;
    height: 100vh;
    z-index: 3;
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
const LyricWrapper = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;

    :hover #btnCopyLine {
        opacity: 1;
    }
`
const BtnCopyLine = Styled.button`
    color: #fff;
    opacity: 0;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 8px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: 10px;
`

const Lyrics = Styled.section`
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 2.3em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-left: 60px;
`
const Word = Styled.p`
    margin: 2px 5px;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        background-color: #1700A3;
    }
`

const LyricScreen: React.FC = () => {

    const { lyricProp } = useLyricContext();
    const [word, setWord] = useState('');

    const copyContent = (currentValue): void => {
        navigator.clipboard.writeText(currentValue).then(()=> alert('copied'))
    }

    return(
        <>
        {lyricProp.showLyrics &&
            <ViewPort>
                {!!word  &&
                <DefinitionFromDictionary
                    setWord={setWord}
                    word={word}
                />}
                <Fade>
                    <LyricWrapper>
                        <Lyrics>
                            {lyricProp.currentLine.split(' ').map((w, i)=>{
                                return (
                                    <Word
                                        onClick={()=> setWord(w)}
                                        key={i+w}>
                                        { w }
                                    </Word>
                                )
                            })}
                        </Lyrics>
                        <BtnCopyLine
                            id="btnCopyLine"
                            onClick={()=> copyContent(lyricProp.currentLine)}
                        >
                            copy
                        </BtnCopyLine>
                    </LyricWrapper>
                </Fade>
            </ViewPort>
        }
        </>
    )
}

export default LyricScreen;