import React from "react";
import Link from 'next/link';
import { useRouter } from 'next/router';
import faker from 'faker';
import Styled from 'styled-components';
import { istatic } from "api/istatic";


const NavBarContainer = Styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 4;
  width: 50px;
  height: 100vh;
  box-shadow: inset 0px 60px 60px rgb(0 0 0 /70%);
  backdrop-filter: blur( 0px );
  -webkitBackdrop-filter: blur( 0px );
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
`
const Bottom = Styled.section`
  margin-bottom: 25px;
`


const NavBar: React.FC = () => {

  const { pathname } = useRouter();

  const navigationOptions = {
    top: [
      {
        path: '/',
        icon: istatic.homeIcon(),
        alt: 'Home Icon'
      },{
        path: '/explore',
        icon: istatic.exploreIcon(),
        alt: 'explore Icon'
      },{
        path: '/emotions',
        icon: istatic.music_note_white(),
        alt: 'emotions Icon'
      },{
        path: '/community',
        icon: istatic.iconCommunity(),
        alt: 'community Icon'
      },{
        path: '/library',
        icon: istatic.libraryIcon(),
        alt: 'library Icon'
      },
    ],
    bottom: [
      {
        path: '/search',
        icon: istatic.search_Icon(),
        alt: 'search Icon'
      }
    ]
  };

  return (
    <NavBarContainer>
      <OptionsBox>
        {navigationOptions.top.map((option, i) => {
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