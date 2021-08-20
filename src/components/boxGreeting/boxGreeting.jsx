import React, { useState } from 'react';

import Styled from 'styled-components'
import { Link } from 'react-router-dom'


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
    background: url(https://www.enjpg.com/img/2020/aesthetic-desktop-3.png) no-repeat center/100% black;
    background-position: 0% 75%;
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

    const [music, setMusic] = useState({Artist: ['none', 'none']})

    const getTime = () => {
        return new Date().getHours();
    }

    const setGreeting = () => {
        var time = getTime()

        const period = [
            {'Good Night': time >= 0 && time < 5},
            {'SunRise': time == 5},
            {'Good Morning': time >= 6 && time < 12},
            {'Good Afternoon': time >= 12 && time < 18},
            {'Good Evening': time >= 18 && time <= 23}
        ]

        const firstIndexSameTrue = period.findIndex(value => Object.values(value)[0] == true);
        return Object.keys(period[firstIndexSameTrue])[0]
    }

    return (
        <>
            <GreetingText>{setGreeting()}, {nameUser}</GreetingText>
            <ViewPort>
                
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