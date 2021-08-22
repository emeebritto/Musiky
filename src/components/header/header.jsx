import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'

import Styled from 'styled-components'

import { player, scroll } from '../../controllers'

import Profile from "../../assets/img/MyPersonalLogo.png"
import branding from "../../assets/img/branding_Musiky.png"
import shortBranding from '../../assets/img/shortBranding.png'

const HeaderBranding = Styled(Link)`
    width: 110px;
    height: 35px;
    background: url(${branding}) no-repeat center/100%;
    margin-left: 10px;
    margin-bottom: 5px;

    @media(max-width: 570px) {
        width: 100px;
    }
`
const HeaderContainer = Styled.header`
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

    @media(max-width: 670px) {
        padding-top: 0.5vh;
        height: 7vh;
    }
`
const OptionsBox = Styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 400px;
    height: 100%;


    @media(max-width: 680px) {
        font-size: 0.9em;
        width: 360px;
    }

    @media(max-width: 570px) {
        display: none;
    }
`
const Links = Styled(Link)`
    height: 24px;
    text-decoration: none;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.4em;
    background-color: rgb(0 0 0 /25%);
    box-shadow: 0px 0px 25px rgb(0 0 0 /60%);
    color: #A1A1A1;
    
    :hover{
        color:white
    }
`
const ProfileImg = Styled.img`
    border-radius: 50px;
    margin: 0px 25px 0px 25px;
    width: 40px;
    height: 40px;

    @media(max-width: 670px) {
        width: 35px;
        height: 35px;
    }
`


function Header({ loadingStates }) {
    const [lyricsMode, setLyricsMode] = useState(false);

    const lyricsMode_header = ({showLyrics}) => {
        setLyricsMode(showLyrics);
    }

    const redirect = () => {
        scroll.toTop()
        loadingStates.pagLoading({loadingBar: true, contentLoaded: false})
        player.closeLyrics()
    }

    useEffect (()=>{
        player.subscribe(lyricsMode_header)
    },[])


    return(
        <HeaderContainer lyrics={lyricsMode}>
            <HeaderBranding to='/' alt="musiky branding"/>
            <OptionsBox>
                <Links onClick={()=>{redirect()}} to={"/"}>Home</Links>
                <Links onClick={()=>{redirect()}} to={"/explore"}>Explore</Links>
                <Links onClick={()=>{redirect()}} to={"/libraryOff"}>Library</Links>
            </OptionsBox>
            <ProfileImg src={Profile} alt="perfilePhoto"/>
        </HeaderContainer>
    )
}

export default Header;