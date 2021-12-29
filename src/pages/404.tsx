import React from "react";
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Styled from "styled-components";

import { istatic } from "api/istatic";

const ViewPort = Styled.section`
    position: relative;
    overflow-y: scroll;
    width: 98vw;
    height: 100vh;
`
const Wrapper = Styled.section`
    text-align: center;
    padding: 15vh 0;
`
const NumHTTP = Styled.h1`
    margin-top: 20vh;
    font-size: 7.6em;
    font-family: "Comic Sans MS", Times, serif;
    @media(max-width: 710px) {
        font-size: 7.0em;
    }
`
const Msg = Styled.p`
    font-size: 1.8em;
    font-family: "Ebrima", Times, serif;
    margin-top: 30px;
    @media(max-width: 710px) {
        font-size: 1.5em;
    }
`
const Light = Styled.img`
    position: absolute;
    opacity: 70%;
    top: -18em;
    left: -9em;
    @media(max-width: 1005px) {
        display: none;
    }
`
const LightScattering = Styled.div`
    position: absolute;
    z-index: 0;
    background-color: rgb(255 255 0 /15%);
    filter: blur(60px);
    clip-path: polygon(31% 0, 70% 1%, 100% 100%, 0% 100%);
    width: 275px;
    height: 65vh;
    top: 11em;
    left: 6.5em;
    animation: wave 400ms infinite alternate, lightOff 5s infinite alternate;
    @keyframes wave {
        0% {
            opacity: 80%;
        }
        100% {
            opacity: 100%
        }
    }
    @keyframes lightOff {
        0% {
            opacity: 0%;
        }
        14% {
            opacity: 0%;
        }
        15% {
            opacity: 100%
        }
    }
    @media(max-width: 1005px) {
        display: none;
    }
`
const BtnHome = Styled.button`
    margin-top: 5vh;
    outline: none;
    border: none;
    border-radius: 15px;
    color: white;
    background-color: transparent;
    border: 1px solid gray;
    padding: 5px 10px;
    font-size: 1.2em;
    cursor: pointer;
    transition: 700ms;
    :hover {
        color: black;
        background-color: gray;
    }
`

const NotFound404: NextPage = () => {

    const router = useRouter();

    return (
        <ViewPort style={{ background: `url(${istatic.city()}) no-repeat center/80%`}}>
            <Wrapper>
                <Light src={istatic.cellingLight()} alt="celling Light"/>
                <LightScattering/>
                <NumHTTP>404</NumHTTP>
                <Msg>We can't find the page you're looking for</Msg>
                <BtnHome onClick={()=>{router.push('/')}}>Take me home</BtnHome>
            </Wrapper>
        </ViewPort>
    );
}

export default NotFound404