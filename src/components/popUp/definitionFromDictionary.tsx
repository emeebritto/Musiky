import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import axios from 'axios';
import { musicDownload, multiDownloads, copyContent } from 'common/utils';
import { PlaylistProps } from 'common/types';
import { usePlayerContext } from 'common/contexts/Player';
import { PopUp } from 'components';
import { istatic } from "api/istatic";


const Titles = Styled.section`
    display: flex;
`

const WordName = Styled.h2`
    //styles..
`


interface LayoutProps {
    setWord: (s: string) => void;
    word: string;
}

const DefinitionFromDictionary: React.FC<LayoutProps> = ({
    setWord,
    word
}) => {

    const [defs, setDefs] = useState<any>([]);
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(()=> {
        async function getDef() {
            axios.get(`http://localhost:9872/itools/dictionary?word=${word}`)
                .then(res => {
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
            <Titles>
                <WordName>Word: { word }</WordName>
                <img/>
            </Titles>
            {!!isLoading && <p>Loading...</p>}
            {!!hasError && <p>No definition(s) found for "{word}"</p>}
            {!!defs.length &&
            <section>
                {defs.map((def: any, i: number) => {
                    return (
                        <section>{def.glossary}</section>
                    )
                })}
            </section>}
        </PopUp>
    )
}

export default DefinitionFromDictionary;
