import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { DataStorage } from 'common/storage';

import Styled from 'styled-components';

import { istatic } from 'api/istatic';

const HeaderBranding = Styled.img`
    width: 110px;
    height: 65px;
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
    width: 96.5vw;
    height: 9vh;
    box-shadow: ${(props: {lyrics: boolean}) => (
        props.lyrics 
            ? "inset 0px 40px 40px rgb(0 0 0 /75%)" 
            : "inset 0px 60px 60px rgb(0 0 0 /50%)"
    )};
    backdrop-filter: ${(props: {lyrics: boolean}) => (
        props.lyrics ? "blur( 3.5px )" : "blur( 0px )"
    )};
    -webkitBackdrop-filter: ${(props: {lyrics: boolean}) => (
        props.lyrics ? "blur( 3.5px )" : "blur( 0px )"
    )};

    @media(max-width: 670px) {
        padding-top: 0.5vh;
        height: 7vh;
    }
`

const ProfileField = Styled.section`
    display: flex;
    align-items: center;
    color: #fff;
    margin-right: 30px;
    border-radius: 12px;
    background-color: #0A090E;
    cursor: pointer;
`

const ProfileImg = Styled.img`
    border-radius: 40%;
    width: 40px;
    height: 40px;

    @media(max-width: 670px) {
        width: 35px;
        height: 35px;
    }
`

const UserName = Styled.p`
    margin: 0 14px;
    font-size: 0.9em;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`

const SignInBtn = Styled.button`
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 1em;
    background-color: transparent;
    border: 1px solid #ABAFB2;
    padding: 5px 12px;
    margin-right: 30px;
    cursor: pointer;
`

const AccountIcon = Styled.img`
    margin-right: 5px;
`

const Header: React.FC = () => {
    const [lyricsMode, setLyricsMode] = useState(false);

    const redirectLogin = () => {
        window.location.href = "https://account-infinity.vercel.app";
    }

    return(
        <HeaderContainer lyrics={lyricsMode}>
            <Link href='/'>
                <HeaderBranding src={istatic.branding()}  alt="musiky branding"/>
            </Link>
            {DataStorage.hasToken() &&
                <ProfileField>
                    <ProfileImg src={istatic.EME_branding()} alt="perfilePhoto"/>
                    <UserName>Emerson_Britto</UserName>
                </ProfileField>
            }
            {!DataStorage.hasToken() &&
                <SignInBtn onClick={()=> redirectLogin()}>
                    <AccountIcon src={istatic.iconAccount()} alt='account icon' />
                    SIGN IN
                </SignInBtn>
            }
        </HeaderContainer>
    )
}

export default Header;