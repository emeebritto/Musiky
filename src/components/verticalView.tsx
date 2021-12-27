import React from 'react';
import Link from 'next/link';
import Styled from "styled-components";


const ViewPort = Styled.section`
    margin: 20px 0;
`
const Label = Styled.h2`
    color: white;
    font-size: 1.6em;
    margin: 0 0 16px 18px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`
const ViewWrapper = Styled.section`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    margin-bottom: 15px;
`
const ViewInfor = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #0D0D0D;
    margin-bottom: 25px;
`
const BtnField = Styled.section`
    position: relative;

    :hover #hoverLine {
        opacity: 100%;
        transform: scaleX(11);
    }
`
const BtnOption = Styled.p`
    text-decoration: none;
    cursor: pointer;
    font-size: 1.1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: none;
    color: white;
`
const BtnHoverLine = Styled.section`
    position: absolute;
    background-color: white;
    opacity: 0;
    left: 47%;
    bottom: -5px;
    height: 2px;
    width: 5px;
    transition: 500ms;
`


interface VerticalViewProp {
    children: React.ReactNode;
    viewLabel?: string;
    btnOption?: {
        displayName: string;
        href: string;
    };
}

const VerticalView: React.FC<VerticalViewProp> = ({ children, viewLabel='', btnOption={} }) => {

    return (
        <ViewPort>
            {viewLabel &&
                <ViewInfor>
                    <Label>{viewLabel}</Label>
                    {btnOption.href &&
                        <BtnField>
                            <Link href={btnOption.href}>
                                <BtnOption>{ btnOption.displayName }</BtnOption>
                            </Link>
                            <BtnHoverLine id='hoverLine'/>
                        </BtnField>
                    }
                </ViewInfor>
            }
            <ViewWrapper>{ children }</ViewWrapper>
        </ViewPort>
    )
}

export default VerticalView