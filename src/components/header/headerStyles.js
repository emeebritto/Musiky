import styled from "styled-components";
import { Link } from 'react-router-dom'

export const HeaderBranding = styled.img`
    width: 120px;
    margin-bottom: 5px;
`

export const HeaderContainer = styled.header`
    position: fixed;
    display: flex;
    z-index: 3;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 9vh;
    box-shadow: ${(props) => (props.lyrics ? "inset 0px 40px 40px rgb(0 0 0 /75%)" : "inset 0px 60px 60px rgb(0 0 0 /50%)")};
    backdrop-filter: ${(props) => (props.lyrics ? "blur( 3.5px )" : "blur( 0px )")};
    -webkitBackdrop-filter: ${(props) => (props.lyrics ? "blur( 3.5px )" : "blur( 0px )")};
`
export const OptionsBox = styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 30%;
    height: 100%;
`
export const Links = styled(Link)`
    height: 24px;
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4em;
    background-color: rgb(0 0 0 /30%);
    box-shadow: 0px 0px 25px rgb(0 0 0 /60%);
    color: #A1A1A1;
    
    :hover{
        color:white
    }
`
export const ProfileImg = styled.img`
    border-radius: 50px;
    margin: 0px 25px 0px 25px;
    width: 40px;
    height: 40px;
`