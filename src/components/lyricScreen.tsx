import React, { useState } from "react";
import Styled from "styled-components";
import { istatic } from 'api/istatic';

import { useLyricContext } from "common/contexts/Lyric";
import { usePlayerContext } from "common/contexts/Player";
import { DefinitionFromDictionary } from "components";


const ViewPort = Styled.section`
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
    z-index: 3;
    background-color: #000;
`
const LyricField = Styled.section`
    margin-top: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #000;
    opacity: 0.9;
    padding: 15vh 0;
`
const LyricWrapper = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;

    :hover #btnCopyLine {
        opacity: 0.7;
    }
`
const FullLyricWrapper = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 60%;
`
const BtnCopyLine = Styled.button`
    color: #fff;
    opacity: 0;
    background-color: transparent;
    border: 2px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-left: 10px;
    transition: 200ms;
`
const Lyrics = Styled.section`
    max-width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 2.3em;
    min-height: 80px;
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
const Hr = Styled.hr`
    width: 25vw;
    opacity: 0.3;
`
const BtnSeeFullLyric = Styled.button`
    background-color: ${(props: {active: boolean}) => (props.active ? "#fff" : "transparent")};
    border: 2px solid #fff;
    color: ${(props: {active: boolean}) => (props.active ? "#000" : "#fff")};
    border-radius: 16px;
    font-size: 1.2em;
    padding: 4px 14px;
    cursor: pointer;
    transition: 400ms;
    margin: 10px 0;

    :hover {
        opacity: 0.7;
    }
`
const LyricLine = Styled.p`
    font-size: 1.3em;
    margin: 1px 0;
    opacity: ${(props: {active: boolean}) => (props.active ? "0.9" : "0.6")};
    font-weight: ${(props: {active: boolean}) => (props.active ? "bold" : "")};
    cursor: pointer;
    transition: 100ms;

    :hover {
        opacity: 1;
    }
`

const LyricScreen: React.FC = () => {

    const { lyricProp, getFullLyric, getLyricTimeRef } = useLyricContext();
    const { ref } = usePlayerContext();
    const [word, setWord] = useState('');
    const [fullLyric, setFullLyric] = useState(false);

    const copyContent = (currentValue: string): void => {
        navigator.clipboard.writeText(currentValue).then(()=> alert('copied'))
    }

    const goToLine = (i: number): void => {
        ref.playerRef.seekTo(getLyricTimeRef()[i], 'seconds');
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
                <LyricField>
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
                            <img src={istatic.copyIcon()} alt='copy'/>
                        </BtnCopyLine>
                    </LyricWrapper>
                    <Hr/>
                    <BtnSeeFullLyric
                        onClick={()=> setFullLyric(fullLyric=> !fullLyric)}
                        active={fullLyric}
                    >
                        See Full Lyric
                    </BtnSeeFullLyric>
                    {!!fullLyric &&
                    <>
                    <Hr/>
                    <FullLyricWrapper>
                        {getFullLyric().map((line, i) => {
                            return (
                                <LyricLine
                                    onClick={()=> goToLine(i)}
                                    active={lyricProp.currentIndex === i}
                                >
                                    {line}
                                </LyricLine>
                            )
                        })}
                    </FullLyricWrapper>
                    </>}
                </LyricField>
            </ViewPort>
        }
        </>
    )
}

export default LyricScreen;