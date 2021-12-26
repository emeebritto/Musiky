import Styled from 'styled-components';


export const PlaylistInfor = Styled.section`
    position: fixed;
    left: 15%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 22%;

    @media(max-width: 1230px) { left: 12% }

    @media(max-width: 1075px) { 
        left: 0%;
        position: relative;
        flex-direction: row;
        justify-content: center;
        width: 95%;
        margin-bottom: 50px;
    }
`
export const BackIcon = Styled.img`
    width: 35px;
    border-radius: 8px;
    margin-bottom: 25px;

    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255 /3%);
    }

    @media(max-width: 1075px) { 
        margin-bottom: 0px;
    }

    @media(max-width: 570px) { 
        display: none;
    }
`
export const PlayListImg = Styled.img`
    width: 190px;
    height: 190px;
    border-radius: 10px;
    box-shadow: 1px 1px 30px rgb(0 0 0 / 35%);
    margin-bottom: 15px;

    @media(max-width: 1075px) { 
        margin: 0 50px 0 40px;
    }

    @media(max-width: 620px) { 
        width: 190px;
        height: 190px;
    }

    @media(max-width: 499px) {
        width: 170px;
        height: 170px;
        margin: 0 15px 0 55px;
    }
`
export const PlaylistTitle = Styled.p`
    color: white;
    font-size: 1.4em;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 10px;
`
export const PlaySubTitle = Styled(PlaylistTitle)`
    color: #fff;
    opacity: 0.7;
    font-size: 1em;
`
