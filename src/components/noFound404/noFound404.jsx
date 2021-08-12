import React from "react";
import Styled from "styled-components";
import { useHistory } from 'react-router-dom'

import city from '../../assets/img/city.svg'
import cellingLight from '../../assets/img/cellingLight.png'

const ViewPort = Styled.section`
    position: relative;
    margin-top: 18vh;
    text-align: center;
    color: rgb(255 255 255/50%);
    width: 80%;
    height: 100%;
    margin-bottom: 20vh;
`
const NumHTTP = Styled.h1`
    margin-top: 20vh;
    font-size: 7.6em;
    font-family: "Comic Sans MS", Times, serif;
`
const Msg = Styled.p`
    font-size: 1.8em;
    font-family: "Ebrima", Times, serif;
    margin-top: 30px;
`
const Light = Styled.img`
    position: absolute;
    opacity: 70%;
    top: -22em;
    left: 2em;
`
const LightScattering = Styled.div`
    position: absolute;
    background-color: rgb(255 255 0 /15%);
    filter: blur(60px);
    clip-path: polygon(31% 0, 70% 1%, 100% 100%, 0% 100%);
    width: 275px;
    height: 65vh;
    top: 7em;
    left: 17.5em;
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
    transition: 700ms;

    :hover {
        cursor: pointer;
        color: black;
        background-color: gray;
    }
`

const NotFound404 = () => {

    let history = useHistory()

    return (
        <ViewPort style={{ background: `url(${city}) no-repeat center/100%`}}>
            <Light src={cellingLight} alt="celling Light"/>
            <LightScattering/>
            <NumHTTP>404</NumHTTP>
            <Msg>Pag Not Found</Msg>
            <BtnHome onClick={()=>{history.push('/')}}>Home</BtnHome>
        </ViewPort>
    );
}

export default NotFound404