import React, {useEffect, useState} from "react"

import Profile from "../../assets/img/MyPersonalLogo.png"
import branding from "../../assets/img/branding_Musiky.png"
import { HeaderBranding, HeaderContainer, OptionsBox, Links, ProfileImg} from "../header/headerStyles";

function Header({ player, loadingStates }) {
    const [lyricsMode, setLyricsMode] = useState(false);

    const lyricsMode_header = (prop) => {
        setLyricsMode(prop);
    }

    const redirect = () => {
        loadingStates.pagLoading({loadingBar: true, contentLoaded: false})
        player.closeLyrics()
    }

    useEffect (()=>{
        player.setHeaderFunction(lyricsMode_header)
    },[])


    return(
        <HeaderContainer lyrics={lyricsMode}>
            <HeaderBranding src={branding} alt="musiky_logo"/>
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