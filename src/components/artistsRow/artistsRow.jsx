import React, { useState, useEffect } from "react";

//import {getArtistsRow} from 'api'

import { scroll } from 'controllers'

import ArtistCard from '../artistCard'

import Styled from "styled-components";
import { Link } from 'react-router-dom'

const TitleAndBtnExplore = Styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid #100F0F;
    margin-bottom: 25px;

    @media(max-width: 505px) {
        border-bottom: 3px solid #100F0F;
    }
`
const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

    @media(max-width: 900px) {
        margin-left: 18px;
    }

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`
const BtnField = Styled.section`
    position: relative;

    :hover #hoverLine {
        opacity: 100%;
        transform: scaleX(11);
    }

    @media(max-width: 900px) {
        margin-right: 18px;
    }

    @media(max-width: 545px) {
        transform: scale(0.85);
        top: 2px;
    }
`
const BtnFindOthers = Styled(Link)`
    text-decoration: none;
    cursor: pointer;
    font-size: 1.1em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border: none;
    color: white;
`
const BtnHoverLine = Styled.section`
    position: absolute;
    background-color: white;
    opacity: 0;
    left: 40px;
    top: 20px;
    height: 2px;
    width: 5px;
    transition: 500ms;
`
const ViewPort = Styled.section`
    display: flex;
    align-items: center;
    overflow: scroll;
    height: 275px;
    margin-bottom: 15px;

    ::-webkit-scrollbar {
        width: 0;
    }  

    @media(max-width: 545px) {
        font-size: 1.4em;
    }
`


const ArtistsRow = () => {

    const [artists, setArtists] = useState([
        {
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F0a%2F81%2F170a815040a32fcc2f596c59c9284c15.jpg&f=1&nofb=1',
            name: 'julito nevezz'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.primerosenlaquinta.cl%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoticia-1565209229-instagram-redes-sociales-el-gato-del-meme-en-la-mesa-viral-facebook-manda-panda.png&f=1&nofb=1',
            name: 'none do nono'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3d%2Ff7%2F04%2F3df70452f84bbf7da54212ade74f9433.jpg&f=1&nofb=1',
            name: 'none'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F0a%2F81%2F170a815040a32fcc2f596c59c9284c15.jpg&f=1&nofb=1',
            name: 'julito'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.primerosenlaquinta.cl%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoticia-1565209229-instagram-redes-sociales-el-gato-del-meme-en-la-mesa-viral-facebook-manda-panda.png&f=1&nofb=1',
            name: 'none'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3d%2Ff7%2F04%2F3df70452f84bbf7da54212ade74f9433.jpg&f=1&nofb=1',
            name: 'none'
        }

    ])

    useEffect(() => {

        async function getData() {
            //setArtists(await getArtistsRow())
        }
        getData()

    },[])
    
    return (
        <>  
            <TitleAndBtnExplore>
                <TitleSection>Artists</TitleSection>
                <BtnField>
                    <BtnFindOthers 
                        tabIndex='1' 
                        onClick={()=> scroll.toTop()} 
                        to='/artists'>Find Others</BtnFindOthers>
                    <BtnHoverLine id='hoverLine'/>
                </BtnField>
            </TitleAndBtnExplore>
            <ViewPort>
                {artists.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index}/>
                    )
                })}
            </ViewPort>
        </>
    )
}

export default ArtistsRow