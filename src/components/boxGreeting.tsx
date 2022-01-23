import React from 'react';
import Styled from 'styled-components';

const ViewPort = Styled.section`
    width: 80%;
    margin: 40px 0;
`

const GreetingText = Styled.h1`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;
    font-size: 1.6em;
    padding: 5px 10px;
    border-left: 2px solid blue;

    @media(max-width: 900px) {
        margin-left: 30px;
    }

    @media(max-width: 545px) {
        font-size: 1.3em;
        margin-bottom: 40px;
    }
`


interface BoxGreetingProps {
    data: {
        greetingText: string;
    };
}

const BoxGreeting: React.FC<BoxGreetingProps> = ({ data }) => {

    let nameUser = 'Emerson Britto';


    return (
        <ViewPort>
            <GreetingText>{data.greetingText}, {nameUser}</GreetingText>
        </ViewPort>
    )
}

export default BoxGreeting