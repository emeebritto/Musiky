import React, { useState, useEffect } from "react";

//import { getAllArtists } from "../../api";

import { ArtistCard } from '../../components'

import Styled from "styled-components";
import { Link } from 'react-router-dom'

export const TitleSection = Styled.h2`
    color: white;
    font-size: 1.6em;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    margin-bottom: 45px;

    @media(max-width: 545px) {
        margin-left: 20px;
        width: 95%;
    }
`
const ViewPort = Styled.section`
    margin-top: 17vh;
    width: 80%;
    margin-bottom: 17vh;

    @media(max-width: 545px) {
        margin-top: 15vh;
        width: 95%;
    }
`

export const Artists = Styled.section`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
`


const ArtistsList = () => {

    const [artists, setArtists] = useState([
        {
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F0a%2F81%2F170a815040a32fcc2f596c59c9284c15.jpg&f=1&nofb=1',
            name: 'julito'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.primerosenlaquinta.cl%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoticia-1565209229-instagram-redes-sociales-el-gato-del-meme-en-la-mesa-viral-facebook-manda-panda.png&f=1&nofb=1',
            name: 'none'
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
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F0a%2F81%2F170a815040a32fcc2f596c59c9284c15.jpg&f=1&nofb=1',
            name: 'julito'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.primerosenlaquinta.cl%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoticia-1565209229-instagram-redes-sociales-el-gato-del-meme-en-la-mesa-viral-facebook-manda-panda.png&f=1&nofb=1',
            name: 'none'
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
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F17%2F0a%2F81%2F170a815040a32fcc2f596c59c9284c15.jpg&f=1&nofb=1',
            name: 'julito'
        },{
            img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.primerosenlaquinta.cl%2Fwp-content%2Fuploads%2F2019%2F08%2Fnoticia-1565209229-instagram-redes-sociales-el-gato-del-meme-en-la-mesa-viral-facebook-manda-panda.png&f=1&nofb=1',
            name: 'none'
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

            //setArtists(await getAllArtists())
        }
        getData()

    },[])


    return (
        <ViewPort>
            <TitleSection>All Artists</TitleSection>
            <Artists>
                {artists.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index}/>
                    )
                })}
            </Artists>
        </ViewPort>
    )
}

export default ArtistsList