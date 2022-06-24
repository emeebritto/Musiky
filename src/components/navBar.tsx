import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import faker from "faker";
import Styled from "styled-components";
import istatic from "services/istatic";
import urlEncoding from 'common/urlEncoding';
import { ProfileImage } from "components";
import { useAccountContext } from "contexts/Account";


const NavBarContainer = Styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 4;
  width: 60px;
  height: 100vh;
  box-shadow: inset 0px 60px 60px rgb(0 0 0 /70%);
  backdrop-filter: blur( 0px );
  -webkitBackdrop-filter: blur( 0px );
`
const WrapperProfileImg = Styled.button`
  position: relative;
  margin-top: 8px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover #username-text {
    display: inline-block;
  }
`
const ProfileImg = Styled.img`
  border-radius: 50%;
  width: 90%;
  height: 95%;

  @media(max-width: 670px) {
    width: 35px;
    height: 35px;
  }
`
const UserName = Styled.p`
  position: absolute;
  display: none;
  left: 70px;
  top: 50px;
  padding: 5px 10px;
  background-color: #000;
  border-radius: 8px;
`
const OptionsBox = Styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 40%;
`
const IconOption = Styled.img`
  width: 25px;
  opacity: ${(props: {active: boolean}) => (
    props.active ? "100%" : "60%"
  )};
  background-color: rgb(255 255 255 / ${(props: {active: boolean}) => (
    props.active ? "15%" : "0%"
  )});
  box-shadow: 0px 0px 18px rgb(255 255 255 / ${(props: {active: boolean}) => (
    props.active ? "40%" : "0%"
  )});
  margin-bottom: 3px;
`
const Option = Styled.a`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 0.9em;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: rgb(0 0 0 /25%);
  box-shadow: 0px 0px 25px rgb(0 0 0 /60%);
  color: #fff;
  cursor: pointer;

  :hover #label-alt {
    display: inline;
  }
`
const Label = Styled.p`
  position: absolute;
  display: none;
  left: 65px;
  padding: 5px 10px;
  background-color: #000;
  border-radius: 8px;
`
const Bottom = Styled.section`
  margin-bottom: 25px;
`


const NavBar: React.FC = () => {

  const { pathname } = useRouter();
  const { props, hasAccount } = useAccountContext();

  const redirectToSignIn = () => {
    const after = urlEncoding(`http://localhost:3000${pathname}`).encoder();
    window.location.href = `http://localhost:8080/sso?after=${after}`;
  }

  const navigationOptions = {
    top: [
      {
        path: '/',
        name: 'Home',
        icon: istatic.iconUrl({ name: "home" }),
        alt: 'Home Icon'
      },{
        path: '/explore',
        name: 'Explore',
        icon: istatic.iconUrl({ name: "explore" }),
        alt: 'explore Icon'
      },{
        path: '/emotions',
        name: 'Emotions',
        icon: istatic.iconUrl({ name: "music_note" }),
        alt: 'emotions Icon'
      },{
        path: '/community',
        name: 'Community',
        icon: istatic.iconUrl({ name: "groups" }),
        alt: 'community Icon'
      },{
        path: '/library',
        name: 'Library',
        icon: istatic.iconUrl({ name: "video_library" }),
        alt: 'library Icon'
      },
    ],
    bottom: [
      {
        path: '/search',
        name: 'Search',
        icon: istatic.iconUrl({ name: "search" }),
        alt: 'search Icon'
      }
    ]
  };

  return (
    <NavBarContainer>
      <ProfileImage
        isLogged={hasAccount()}
        label={props.displayName}
        altLabel="Click to login"
        onClick={() => hasAccount() ? alert("hi") : redirectToSignIn()}
      />
      <OptionsBox>
        {navigationOptions.top.map((option, i) => {
          return (
            <Link href={option.path} key={faker.datatype.uuid() + i}>
              <Option>
                <IconOption 
                    active={option.path === pathname} 
                    src={option.icon} 
                    alt={option.alt}
                  />
                  <Label id="label-alt">{option.name}</Label>
              </Option>
            </Link>                        
          );
        })}
      </OptionsBox>
      <Bottom>
        {navigationOptions.bottom.map((option, i) => {
          return (
            <Link href={option.path} key={faker.datatype.uuid() + i}>
              <Option>
                <IconOption 
                    active={option.path === pathname} 
                    src={option.icon} 
                    alt={option.alt}/>
              </Option>
            </Link>
          );
        })}
      </Bottom>
    </NavBarContainer>
  )
}

export default NavBar;