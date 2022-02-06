import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import axios from 'axios';
import { musicDownload, multiDownloads, copyContent } from 'common/utils';
import { PlaylistProps } from 'common/types';
import { usePlayerContext } from 'common/contexts/Player';
import { PopUp } from 'components';
import { istatic } from "api/istatic";
import { IstaticBaseUrl } from 'api';

const Wrapper = Styled.section`
    max-width: 40vw;
`
const Titles = Styled.section`
    display: flex;
    align-items: center;
`

const WordName = Styled.h2`
    //styles..
`
const Pronounce = Styled.img`
    margin: 0 10px;
    cursor: pointer;
`
const Hr = Styled.hr`
    opacity: 0.3;
    margin: 10px 0;
`
const Def = Styled.p`
    margin: 10px 0;
`


interface LayoutProps {
    setWord: (s: string) => void;
    word: string;
}

const DefinitionFromDictionary: React.FC<LayoutProps> = ({
    setWord,
    word
}) => {

    word = word.replace(/,|;|\(|\)|\?/gi, '').toLowerCase();

    const [defs, setDefs] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(()=> {
        async function getDef() {
            axios.get(`${IstaticBaseUrl}itools/dictionary?word=${word}`)
                .then(res => {
                    console.log(res.data);
                    setDefs(res.data)
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err.msg);
                    setHasError(true);
                    setLoading(false);
                })
        }
        setLoading(true);
        getDef();
    },[])

    return (
        <PopUp show={!!word} onRequestClose={()=> setWord('')}>
            <Wrapper>
                <Titles>
                    <WordName>Word: { word }</WordName>
                    <Pronounce src={istatic.iconVolume()} alt='play pronounce'/>
                </Titles>
                <Hr/>
                {!!isLoading && <p>Loading...</p>}
                {!!hasError && <p>No definition(s) found for "{word}"</p>}
                {!!defs.length &&
                <section>
                    {defs.map((def: any, i: number) => {
                        return (
                            <Def>{i+1}. {def.glossary} - ({def.meta.synsetType})</Def>
                        )
                    })}
                </section>}
                {!isLoading && <a href={`https://www.oxfordlearnersdictionaries.com/us/definition/english/${word}`} target="_blank">SEE MORE</a>}
            </Wrapper>
        </PopUp>
    )
}

export default DefinitionFromDictionary;