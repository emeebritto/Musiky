import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Styled from "styled-components";
import { Swiper } from 'swiper/react';
import 'swiper/css';


const ViewPort = Styled.section`
    overflow: hidden;
    ${(props: {width?: string, margin?: string}) => (`
        width: ${props.width || ""};
        margin: ${props.margin || "0"};
    `)};
`
const Label = Styled.h2`
    color: white;
    font-size: ${(props: {labelSize?: string}) => (props.labelSize ||  "1.6em")};
    margin-left: 18px;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
`
const ViewWrapper = Styled.section`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    margin-bottom: 15px;
    ${(props: {addStyle: any}) => (props.addStyle)}

    .swiper {
        display: flex;
        justify-content: center;
        width: 80vw;
    }
`
const ViewInfor = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    ${(props: {desableLine?: boolean}) => (props.desableLine
        ? "" 
        : `border-bottom: 1px solid #0D0D0D;
           margin-bottom: 25px;`
    )}
`
const BtnField = Styled.section`
    position: relative;
    margin-right: 15px;

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
    width?: string;
    margin?: string;
    labelSize?: string;
    addStyle?: any;
    desableLine?: boolean;
    desableSwipeMode?: boolean;
    slidesPerView?: number;
}

const VerticalView: React.FC<VerticalViewProp> = ({ 
    children,
    viewLabel='',
    btnOption={},
    width='',
    margin='',
    labelSize='',
    addStyle=false,
    desableLine=false,
    desableSwipeMode=false,
    slidesPerView=null
}) => {

    const [screenWidth, setScreenWidth] = useState(0)

    useEffect(()=>{
        const win: any = window;
        setScreenWidth(win.innerWidth)
        if(win.attachEvent) {
            win.attachEvent('onresize', function() {
                setScreenWidth(win.innerWidth)
            });
        }
        else if(win.addEventListener) {
            win.addEventListener('resize', function() {
                setScreenWidth(win.innerWidth)
            }, true);
        }

        return ()=> {
            if(win.detachEvent) {
                win.detachEvent('onresize', function() {
                    setScreenWidth(win.innerWidth)
                })
            }
            else if(win.removeEventListener) {
                win.removeEventListener('resize', function() {
                    setScreenWidth(win.innerWidth)
                }, true)
            }
        }
    },[])

    return (
        <ViewPort width={width} margin={margin}>
            {viewLabel &&
                <ViewInfor desableLine={desableLine}>
                    <Label labelSize={labelSize}>{viewLabel}</Label>
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
            <ViewWrapper addStyle={addStyle}>
            {desableSwipeMode ?
                <>{ children }</>
                :<Swiper
                    slidesPerView={slidesPerView || (6 * screenWidth) / 1366}
                    modules={[]}
                >
                    { children }
                </Swiper>
            }
            </ViewWrapper>
        </ViewPort>
    );
};

export default VerticalView;
