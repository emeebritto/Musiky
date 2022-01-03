import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShortCutUrl } from 'common/shortcutUrl';

import { useAccountContext } from 'common/contexts/Account';

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
    box-shadow: inset 0px 40px 30px rgb(0 0 0 /80%);

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

    const { props, hasAccount } = useAccountContext();

    const router = useRouter();

    const redirectLogin = () => {
        //let after = ShortCutUrl.codeUrl(`https://web-musiky.vercel.app${router.pathname}`);
        let after = ShortCutUrl.codeUrl(`http://localhost:3000${router.pathname}`);
        //window.location.href = `https://account-infinity.vercel.app?after=${after}`;
        window.location.href = `http://localhost:8080/sso?after=${after}`;
    }

    return(
        <HeaderContainer>
            <Link href='/'>
                <HeaderBranding src={istatic.branding()}  alt="musiky branding"/>
            </Link>
            {hasAccount() &&
                <ProfileField>
                    <ProfileImg src={istatic.EME_branding()} alt="perfilePhoto"/>
                    <UserName>{props.displayName}</UserName>
                </ProfileField>
            }
            {!hasAccount() &&
                <SignInBtn onClick={()=> redirectLogin()}>
                    <AccountIcon src={istatic.iconAccount()} alt='account icon' />
                    SIGN IN
                </SignInBtn>
            }
        </HeaderContainer>
    )
}

export default Header;