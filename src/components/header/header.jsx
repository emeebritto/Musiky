import React, {useEffect, useState} from "react"

import Profile from "../../assets/img/MyPersonalLogo.png"
import branding from "../../assets/img/branding_Musiky.png"
import { HeaderBranding, HeaderContainer, OptionsBox, Links, ProfileImg} from "../header/headerStyles";

function Header({ player }) {
    const [lyricsMode, setLyricsMode] = useState(false);

    const lyricsMode_header = (prop) => {
        setLyricsMode(prop);
    }

    const closeLyrics = () => {
        player.closeLyrics()
    }

    useEffect (()=>{
        player.setHeaderFunction(lyricsMode_header)
    }, [])


    return(
        <HeaderContainer lyrics={lyricsMode}>
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