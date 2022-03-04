import styled from "styled-components";

export const flex_Section = styled.section`
    display: flex;
    align-items: center;
    height: 100%;
`
export const ViewPort = styled.main`
    display: flex;
    align-items: center;
    position: fixed;
    z-index: 5;
    bottom: 0vh;
    justify-content: space-around;
    width: 95.5vw;
    height: 10vh;
    box-shadow: inset 0px -50px 30px rgb(0 0 0 /80%);

    @media(max-width: 570px) {
        height: 8vh;
        bottom: 7vh;
        box-shadow: inset 0px -50px 40px rgb(0 0 0 /55%);
        backdrop-filter: blur( 0px );
        -webkitBackdrop-filter: blur( 0px );
    }
`
//------ part - left ------------------------------------------------------

export const MusicInfor = styled(flex_Section)`
    width: 30%;
    border-radius: 6px;
    transition: 300ms;
    cursor: pointer;

    :hover {
        background-color: rgba(255, 255, 255, 0.03);
    }

    @media(max-width: 1070px) {
        width: 35%;
    }

    @media(max-width: 780px) {
        width: 45%;
    }

    @media(max-width: 700px) {
        width: 65%;
    }

    @media(max-width: 570px) {
        width: 50%;
    }
`
export const ControlPainelWrapper = styled.section`
    width: 40%;
    height: 100%;
`
export const PlayerControlPainel = styled(flex_Section)`
    position: relative;
    justify-content: center;
    width: 100%;
    height: 100%;
    flex-direction: column;
`
export const OtherSetting = styled(flex_Section)`
    justify-content: flex-end;
    width: 30%;
    margin-right: 15px;

    @media(max-width: 780px) {
        width: 35%;
    }

    @media(max-width: 570px) {
        display: none;
    }
`
export const MusicImg = styled.img`
    margin-left: 10px;
    margin-right: 15px;
    width: 85px;
    height: 55px;
    border-radius: 5px;

    @media(max-width: 700px) {
        display: none;
    }
`
export const SectionTitles = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    max-width: 65%;
`

export const MusicTitle = styled.p`
    font-size: 1.1em;
    color: white;
    -webkit-text-stroke-width: 0.0px;
    -webkit-text-stroke-color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 5px;

    @media(max-width: 499px) {
        font-size: 1em;
    }
`
export const MusicTitleInControl = styled(MusicTitle)`
    background-color: rgb(0 0 0 /40%);
    box-shadow: 0px 0px 30px rgb(0 0 0 /100%);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 4px;
    word-break: keep-all;
`

export const MusicSubTitle = styled.p`
    display: flex;
    font-size: 0.9em;
    opacity: 0.7;
    color: #fff;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

// ------- part - center -----------------------------------------------------

export const BtnsBackPlayNext = styled.section`
    display:flex;
    justify-content: space-between;
    width: 26%;

    @media(max-width: 1070px) {
        width: 54%;
    }

    @media(max-width: 780px) {
        width: 97%;
    }
`

export const BtnPlayerControl = styled.button`
    background-color: ${(props: {play?: boolean}) => (
        props.play ? "white" : "transparent"
    )};
    border: none;
    width:36px;
    height: 36px;
    margin-bottom: 10px;
    border-radius: 30px;
    transition: 500ms;

    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255/${(props: {play?: boolean}) => (
            props.play ? "70%" : "0%"
        )});
    }

    @media(max-width: 1070px) {
        margin: 0px 5px 0px 5px;
    }
`
export const IconPlay = styled.img`
    margin: 3px 0px 0px 0px;
`
export const Loading = styled.img`
    position: relative;
    bottom: 12%;
`

export const MusicTimeCounter = styled.section`
    position: absolute;
    font-size: 0.75em;
    opacity: 0.8;
    left: 11%;
    bottom: 26%;
`

export const MusicTimeTotal = styled.section`
    position: absolute;
    font-size: 0.75em;
    opacity: 0.8;
    right: 11%;
    bottom: 26%;
`

export const DurationSlider = styled.input`
    -webkit-appearance: none;
    width: 80%;
    outline: none;
    height: 4px;
    border-radius: 5px;
    margin: 0 15px;
    cursor: pointer;

    ::-webkit-slider-thumb{
        -webkit-appearance: none;
        position: relative;
        height: 15px;
        width: 15px;
        top: 0px;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0px 1px 20px black;
    }

    @media(max-width: 1070px) {
        position: fixed;
        width: 95%;
        height: 3px;
        opacity: 80%;
        margin-right: 2.5%;
        left: 0;
        bottom: 10vh;
    }

    @media(max-width: 570px) {
        bottom: 8vh;

        ::-webkit-slider-thumb{
            height: 12px;
            width: 12px;
            top: 0px;
        }
    }
`

export const VolumeControl = styled(DurationSlider)`
    width: 25%;
    height: 3px;

    ::-webkit-slider-thumb{
        height: 12px;
        width: 12px;
        top: 0px;
    }

    @media(max-width: 1070px) {
        position: relative;
        margin-right: 0%;
        width: 30%;
        bottom: 0vh;
    }

    @media(max-width: 780px) {
        width: 35%;
    }

    @media(max-width: 700px) {
        display: none;
    }

`

export const BtnIconVolume = styled(BtnPlayerControl)`
    width: 30px;
    height: 30px;
    margin: 0px 5px;
    margin-bottom: 0px;
    transition: 0ms;
`

export const BtnLyrics = styled(BtnIconVolume)`
    opacity: ${(props: {lyrics: boolean}) => (props.lyrics ? "100%" : "60%")};
    filter: drop-shadow(0px 0px ${(props: {lyrics: boolean}) => (
        props.lyrics ? "8px" : "0px"
    )} gray);
    :hover {
        opacity: 100%;
    }
`

export const BtnRepeat = styled(BtnIconVolume)`
    opacity: ${(props: {loop: boolean}) => (props.loop ? "100%" : "60%")};
    filter: drop-shadow(0px 0px ${(props: {loop: boolean}) => (
        props.loop ? "8px" : "0px"
    )} gray);
    :hover {
        opacity: 100%;
    }
`