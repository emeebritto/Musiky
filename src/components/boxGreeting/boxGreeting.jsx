import React from "react";

import Styled from "styled-components"
import { Link } from 'react-router-dom'
import closeIcon from '../../assets/icons/close_white_24dp.svg'


const ViewPort = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 14px;
    width: 100%;
    height: 100px;
    margin-bottom: 35px;
    background: url(https://www.enjpg.com/img/2020/aesthetic-desktop-3.png) no-repeat center/100% black;
    background-position: 0% 70%;
`
const GreetingText = Styled.h1`
    color: white;
    font-size: 1.6em;
    margin-left: 50px;
    background-color: rgb(0 0 0 / 30%);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 5px 10px;
`
const BtnClose = Styled.img`
    margin-right: 25px;
    cursor: pointer;
`


const BoxGreeting = () => {

    return (
        <>
            <ViewPort>
                <GreetingText>Good Evening, Emerson Britto</GreetingText>
                <BtnClose src={closeIcon} alt='close button'/>
            </ViewPort>
        </>
    )
}

export default BoxGreeting