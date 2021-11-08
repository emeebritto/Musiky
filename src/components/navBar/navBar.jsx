import React from "react";
import { useLocation, Link } from 'react-router-dom';

import Styled from 'styled-components';

import { scroll } from 'controllers';

import { istatic } from "api/istatic";


const NavBarContainer = Styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 3;
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
    opacity: ${(props) => (props.active ? "100%" : "60%")};
    background-color: rgb(255 255 255 / ${(props) => (props.active ? "15%" : "0%")});
    box-shadow: 0px 0px 18px rgb(255 255 255 / ${(props) => (props.active ? "40%" : "0%")});
    margin-bottom: 3px;
`

const Option = Styled(Link)`
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
`

const Bottom = Styled.section`
    margin-bottom: 25px;
`


function NavBar({ loadingStates }) {

    let { pathname } = useLocation();

    const redirect = () => {
        scroll.toTop()
        loadingStates.setPageLoadingBar({loadingBar: true, contentLoaded: false})
    }


    return(
        <NavBarContainer>
            <OptionsBox>
                <Option onClick={()=>{redirect()}} to={"/"}>
                    <IconOption 
                        active={'/' === pathname} 
                        src={istatic.homeIcon()} 
                        alt="Home Icon"/>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/explore"}>
                    <IconOption
                        active={'/explore' === pathname} 
                        src={istatic.exploreIcon()}
                        alt="explore Icon"/>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/community"}>
                    <IconOption 
                        active={'/community' === pathname} 
                        src={istatic.iconCommunity()} 
                        alt="Community Icon"/>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/library"}>
                    <IconOption 
                        active={'/library' === pathname} 
                        src={istatic.libraryIcon()} 
                        alt="library Icon"/>
                </Option>
            </OptionsBox>
            <Bottom>
                <Option onClick={()=>{redirect()}} to={"/search"}>
                    <IconOption 
                        active={'/search' === pathname}
                        src={istatic.search_Icon()} 
                        alt="search Icon"/>
                </Option>
            </Bottom>
        </NavBarContainer>
    )
}

export default NavBar;