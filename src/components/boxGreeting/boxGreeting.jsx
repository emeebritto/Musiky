import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { getGreeting } from '../../api'

import Styled from 'styled-components'


const GreetingText = Styled.h1`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 1.6em;
    padding: 5px 10px;
    margin-bottom: 20px;
`
const ViewPort = Styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 14px;
    width: 100%;
    height: 220px;
    margin-bottom: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    box-shadow: inset -365px -60px 160px black;
    overflow: hidden;
`
const Featured = Styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
    margin-right: 5%;
    height: 100%;
    width: 30%;
    color: white;
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
        color: black;
    }
`


const BoxGreeting = () => {

    var nameUser = 'Emerson Britto'

    const [greeting, setGreeting] = useState({})
    const [music, setMusic] = useState({Artist: ['none', 'none']})

    useEffect(()=> {

        async function getData() {
            setGreeting(await getGreeting())
        }
        getData()
    },[])

    return (
        <>
            <GreetingText>{greeting.greetingText}, {nameUser}</GreetingText>
            <ViewPort style={{ background: `url(${greeting.greetingImg}) no-repeat 0% 80%/100% black`}}>
                
                <Featured>
                    <MusicInfor>
                        <MusicTitle>Music long Name Test</MusicTitle>
                        {music.Artist.map((artist, index) => {
                            let space='';
                            if(index > 0){ space = ',  ' }
                            return(
                                <ArtistName 
                                    to={`/artist/${artist.replaceAll(' ', '_')}`}
                                    onClick={(e)=>{e.stopPropagation()}}
                                    >
                                    {space + artist}
                                </ArtistName>
                            )
                        })}
                    </MusicInfor>

                    <BtnListenNow>Listen Now</BtnListenNow>
                </Featured>
            </ViewPort>
        </>
    )
}

export default BoxGreeting