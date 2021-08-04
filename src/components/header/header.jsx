import React, {useEffect, useState} from "react"
import {dataBase as data} from "../../dataBase";

import Profile from "../../assets/img/MyPersonalLogo.png"
import branding from "../../assets/img/branding_Musiky.png"
import { HeaderBranding, HeaderContainer, OptionsBox, Links, ProfileImg} from "../header/headerStyles";

function Header() {
    const [lyrics, setLyrics] = useState(false);

    const lyricsMode_header = () => {
        setLyrics((lyrics) => !lyrics);
    }

    const closeLyrics = () => {
        data.getFunction('closeLyrics')()
        data.getFunction('closeLyricsOnControl')()
        setLyrics(false);
    }

    useEffect (()=>{
        data.setFunction('lyricsMode_header', lyricsMode_header)
    }, [])


    return(
        <HeaderContainer lyrics={lyrics}>
            <HeaderBranding src={branding} alt="musyk_logo"/>
            <OptionsBox>
                <Links onClick={()=>{closeLyrics()}} to={"/"}>Home</Links>
                <Links onClick={()=>{closeLyrics()}} to={"/explore"}>Explore</Links>
                <Links onClick={()=>{closeLyrics()}} to={"/librarie"}>Library</Links>
            </OptionsBox>
            <ProfileImg src={Profile} alt="perfilePhoto"/>
        </HeaderContainer>
    )
}

export default Header;