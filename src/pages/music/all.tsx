import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Styled from "styled-components";

import { MusicList } from 'components';

import { allMusic } from 'api';


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
    overflow: scroll;
    margin: 0 auto;

    ::-webkit-scrollbar {
        width: 0;
    } 
`

const LoadNewZone = Styled.section`
    background-color: red;
    width: 40px;
    height: 40px;
`


const AllMusics: NextPage = () => {

    const [musicList, setMusicList] = useState([]);
    const [secondColumn, setSecondColumn] = useState([]);
    const [page, setPage] = useState(1);

    let id = 'allCol100';
    let secondId = 'allCol200';


    useEffect(() => {

        async function getData() {
            let res = await allMusic({ page });
            let firstPoint = res.items.length / 2;
            let endPoint = res.items.length;

            let newList = [...res.items].splice(0, firstPoint);
            let newSecondColumn = [...res.items].splice(firstPoint, endPoint);


            setMusicList((musicList) => [...musicList, ...newList]);
            setSecondColumn((secondColumn) => [...secondColumn, ...newSecondColumn]);
        }
        getData()
    },[page]);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting)) {
                setPage((currentValue) => currentValue + 1);
            }
        })
        intersectionObserver.observe(document.querySelector('#LoadNewZone'));

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
            <LoadNewZone id='LoadNewZone'/>
        </ViewPort>
    )
}

export default AllMusics
