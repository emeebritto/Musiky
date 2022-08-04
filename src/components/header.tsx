import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Styled from 'styled-components';
import urlEncoding from 'common/urlEncoding';
import istatic from 'services/istatic';
import { Time } from 'components';


const HeaderContainer = Styled.header`
  position: fixed;
  display: flex;
  z-index: 15;
  justify-content: space-between;
  align-items: center;
  width: 95.5vw;
  height: 9vh;
  left: 50px;
  box-shadow: inset 0px 40px 30px rgb(0 0 0 /80%);

  @media(max-width: 670px) {
    padding-top: 0.5vh;
    height: 7vh;
  }
`
const HeaderLeft = Styled.section`
  display: flex;
  align-items: center;
`
const HeaderBranding = Styled.img`
  margin-left: 10px;
  width: 110px;
  cursor: pointer;

  @media(max-width: 570px) {
    width: 100px;
  }
`
const NavigationControl = Styled.section`
  position: relative;
   margin: 4px 0 0 10px;
`

const ControlBtnStyle = Styled.img`
  width: 30px;
  border-radius: 50%;
  background-color: #000912;
  cursor: pointer;
  margin: 0 7px;
  box-shadow: 0 0 20px #000;
`
const RightBtn = Styled(ControlBtnStyle)`
  transform: rotate(-90deg);
`
const LeftBtn = Styled(ControlBtnStyle)`
  transform: rotate(90deg);
`
const HeaderRight = Styled.section`
  display: flex;
  align-items: center;
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
  const router = useRouter();

  return(
    <HeaderContainer>
      <HeaderLeft>
        <Link href='/'>
          <HeaderBranding
            src={istatic.imgUrl({ path: "branding/branding_Musiky.png" })}
            alt="musiky branding"
          />
        </Link>
        <NavigationControl>
          <LeftBtn
            onClick={()=> router.back()}
            src={istatic.iconUrl({ name: "expand_more" })}
            alt='LeftBtn'
          />
          <RightBtn
            onClick={()=> window.history.forward()}
            src={istatic.iconUrl({ name: "expand_more" })}
            alt='RightBtn'
          />
        </NavigationControl>
      </HeaderLeft>
      <HeaderRight>
        <Time margin="0 25px"/>
      </HeaderRight>
    </HeaderContainer>
  )
}

export default Header;
