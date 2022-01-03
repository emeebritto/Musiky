import React, { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Styled from "styled-components";
import axios from 'axios';
import { Music } from 'common/types';

import { MusicList } from 'components';

import { IstaticBaseUrl } from 'api';


const ViewPort = Styled.section`
    overflow-y: scroll;
    width: 96.33vw;
    height: 100vh;
`
const Wrapper = Styled.section`
    display: flex;
    margin: 14vh 0;
`

const MusicListWrapper = Styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    width: 50vw;
    height: auto;
    margin: 0 auto;

    ::-webkit-scrollbar {
        width: 0;
    } 
`

const LoadNewZone = Styled.section`
    width: 40px;
    height: 40px;
`


const AllMusics: NextPage = () => {

    const [musicList, setMusicList] = useState<Array<Music>>([]);
    const [secondColumn, setSecondColumn] = useState<Array<Music>>([]);
    const [page, setPage] = useState(1);
    const ref = useRef<HTMLDivElement | null>(null);

    let id = 'allCol100';
    let secondId = 'allCol200';


    useEffect(() => {
        async function getData() {
            let res = await axios.get(`${IstaticBaseUrl}music/all?page=${page}`)
                .then(r=>r.data)
                .catch(err => console.error(err));
            let firstPoint: number = res.items.length / 2;
            let endPoint: number = res.items.length;

            let newList: Music[] = [...res.items].splice(0, firstPoint);
            let newSecondColumn: Music[] = [...res.items].splice(firstPoint, endPoint);


            setMusicList((musicList: Array<Music>) => [...musicList, ...newList]);
            setSecondColumn((secondColumn: Array<Music>) => [...secondColumn, ...newSecondColumn]);
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


    return (
        <ViewPort>
            <Wrapper>
                <MusicListWrapper>
                    <MusicList list={musicList} listId={id}/>
                </MusicListWrapper>
                <MusicListWrapper>
                    <MusicList list={secondColumn} listId={secondId}/>
                </MusicListWrapper>
            </Wrapper>
            <LoadNewZone ref={ref}/>
        </ViewPort>
    )
}

export default AllMusics
