import React from "react";

import Styled from "styled-components"
import { Link } from 'react-router-dom'


const ViewPort = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 14px;
    width: 100%;
    height: 100px;
    margin-bottom: 35px;
    opacity: 80%;
    background: url(https://www.enjpg.com/img/2020/aesthetic-desktop-3.png) no-repeat center/100% black;
    background-position: 0% 70%;
`


const BoxGreeting = () => {

    return (
        <>
            <ViewPort>
                <h1>Good Evening</h1>
            </ViewPort>
        </>
    )
}

export default BoxGreeting