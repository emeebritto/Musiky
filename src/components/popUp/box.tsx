import React from 'react';
import Styled from 'styled-components';


const ViewPort = Styled.section`
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    z-index: 999;
`

const Box = Styled.section`
    background-color: #020209;
    border-radius: 10px;
    border: 1px solid #020225;
    padding: 10px 15px;
`


interface LayoutProps {
    children: React.ReactNode;
    show: boolean;
    onRequestClose: () => void;
}

const PopUpBox: React.FC<LayoutProps> = ({
    children,
    show=false,
    onRequestClose = ()=>{return}
}) => {

    return (
        <>
        {show &&
            <ViewPort onClick={(e) => {
                e.stopPropagation();
                onRequestClose();
            }}>
                <Box onClick={(e)=> e.stopPropagation()}>
                    {children}
                </Box>
            </ViewPort>
        }
        </>
    )
}

export default PopUpBox;

//https://www.youtube-nocookie.com/embed/