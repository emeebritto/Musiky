import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'

import Styled from 'styled-components'

import { scroll } from 'controllers'

import homeIcon from 'assets/icons/home_white_24dp.svg'
import exploreIcon from 'assets/icons/explore_white_24dp.svg'
import libraryIcon from 'assets/icons/video_library_white_24dp.svg'
import upgradeIcon from 'assets/icons/trending_up_white_24dp.svg'


const NavBarContainer = Styled.aside`
    position: fixed;
    top: 93vh;
    display: ${(props) => (props.disabled ? "none" : "flex")};
    justify-content: center;
    width: 100vw;
    height: 7vh;
    box-shadow: inset 0px 60px 60px rgb(0 0 0 /50%);
    backdrop-filter: blur( 0px );
    -webkitBackdrop-filter: blur( 0px );
`
const OptionsBox = Styled.section`
    display: flex;
    justify-content: space-around;
    width: 400px;
    height: 100%;
`
const IconOption = Styled.img`
    width: 20px;
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


function NavBar({ loadingStates }) {

    const [screenWidth, setScreenWidth] = useState(0)


    const redirect = () => {
        scroll.toTop()
        loadingStates.pagLoading({loadingBar: true, contentLoaded: false})
    }


    useEffect(()=>{

        setScreenWidth(window.innerWidth)

        if(window.attachEvent) {
            window.attachEvent('onresize', function() {
                setScreenWidth(window.innerWidth)
            });
        }
        else if(window.addEventListener) {
            window.addEventListener('resize', function() {
                setScreenWidth(window.innerWidth)
            }, true);
        }

        return ()=> {
            if(window.detachEvent) {
                window.detachEvent('onresize', function() {
                    setScreenWidth(window.innerWidth)
                })
            }
            else if(window.removeEventListener) {
                window.removeEventListener('resize', function() {
                    setScreenWidth(window.innerWidth)
                }, true)
            }
        }

    },[])

    return(
        <NavBarContainer disabled={ screenWidth > 570 }>
            <OptionsBox>
                <Option onClick={()=>{redirect()}} to={"/"}>
                    <IconOption src={homeIcon} alt="Home Icon"/>
                    <p>Home</p>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/explore"}>
                    <IconOption src={exploreIcon} alt="Home Icon"/>
                    <p>Explore</p>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/libraryOff"}>
                    <IconOption src={libraryIcon} alt="Home Icon"/>
                    <p>Library</p>
                </Option>
                <Option onClick={()=>{redirect()}} to={"/upgradeOff"}>
                    <IconOption src={upgradeIcon} alt="Home Icon"/>
                    <p>Upgrade</p>
                </Option>
            </OptionsBox>
        </NavBarContainer>
    )
}

export default NavBar;