import React, { useState, useEffect } from 'react';

import { msk_get } from 'api';

import Styled from 'styled-components';


const ViewPort = Styled.section`
    width: 80%;
`

const GreetingText = Styled.h1`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 1.6em;
    padding: 5px 10px;
    border-left: 2px solid blue;
    margin-bottom: 25px;

    @media(max-width: 900px) {
        margin-left: 30px;
    }

    @media(max-width: 545px) {
        font-size: 1.3em;
        margin-bottom: 40px;
    }
`
const FeaturedWrapper = Styled.section`
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 14px;
    width: 100%;
    height: 220px;
    margin-bottom: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    overflow: hidden;

    @media(max-width: 900px) {
        border-radius: 0px;
    }

    @media(max-width: 800px) {
        height: 180px;
    }
    @media(max-width: 690px) {
        display: none;
    }
`
const Featured = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    z-index: 2;
    margin-right: 5%;
    height: 100%;
    width: 30%;
    color: white;
`
const BlackBackground = Styled.section`
    position: absolute;
    background-color: #000;
    transform: rotate(10deg);
    box-shadow: -65px 25px 70px #000;
    left: 75%;
    z-index: 1;
    width: 35%;
    height: 150%;
`
const MusicInfor = Styled.section`
    text-align: right;
`
const MusicTitle = Styled.h2`
    font-size: 1.9em;
    margin-bottom: 10px;
`
export const ArtistName = Styled.p`
    text-decoration: none;
    display: inline-block;
    font-size: 0.9em;
    color: rgb(255 255 255/ 70%);
`
const BtnListenNow = Styled.button`
    background-color: rgb(0 0 0 /30%);
    border-radius: 16px;
    border: 1px solid white;
    cursor: pointer;
    color: white;
    font-size: 1.1em;
    padding: 5px 15px;
    transition: 500ms;

    :hover {
        background-color: white;
        color: #000;
    }
`


const BoxGreeting = () => {

    var nameUser = 'Emerson Britto';

    const [greeting, setGreeting] = useState({});

    useEffect(()=> {

        async function getData() {
            setGreeting(await msk_get('greeting'));
        }
        getData();

    },[]);


    return (
        <ViewPort>
            <GreetingText>{greeting.greetingText}, {nameUser}</GreetingText>
            <FeaturedWrapper style={{ background: `url(${greeting.greetingImg}) no-repeat 0% 80%/100% black`}}>
                <BlackBackground/>
                <Featured>
                    
                    <MusicInfor>
                        <MusicTitle>Nighteen Songs</MusicTitle>
                    </MusicInfor>

                    <BtnListenNow>Listen Now</BtnListenNow>
                </Featured>
            </FeaturedWrapper>
        </ViewPort>
    )
}

export default BoxGreeting