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
    z-index: 3;
    top: 90vh;
    justify-content: space-between;
    width: 100%;
    height: 10vh;
    box-shadow: inset 0px ${(props)=> (props.lyrics ? "-40px 50px" : "-50px 40px")} rgb(0 0 0 /75%);
    backdrop-filter: blur( ${(props)=> (props.lyrics ? "3.5px" : "0px")});
    -webkitBackdrop-filter: blur( ${(props)=> (props.lyrics ? "3.5px" : "0px")});
`
//------ part - left ------------------------------------------------------

export const MusicInfor = styled(flex_Section)`
    width: 30%;
`
export const PlayerControlPainel = styled(flex_Section)`
    justify-content: center;
    width: 40%;
    flex-direction: column;
`
export const OtherSetting = styled(flex_Section)`
    justify-content: flex-end;
    width: 30%;
    margin-right: 15px;
`
export const MusicImg = styled.img`
    margin-left: 10px;
    margin-right: 15px;
    width: 85px;
    height: 55px;
    border-radius: 5px;
`
export const SectionTitles = styled.section`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
`

export const MusicTitle = styled.p`
    font-size: 1.1em;
    color: white;
    -webkit-text-stroke-width: 0.0px;
    -webkit-text-stroke-color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-bottom: 5px;
`
export const MusicTitleInControl = styled(MusicTitle)`
    background-color: rgb(0 0 0 /40%);
    box-shadow: 0px 0px 30px rgb(0 0 0 /100%);
    border-radius: 4px;
    word-break: keep-all;
`

export const MusicSubTitle = styled.p`
    font-size: 0.9em;
    color: rgb(255 255 255/ 70%);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`

// ------- part - center -----------------------------------------------------

export const BtnsBackPlayNext = styled.section`
    display:flex;
    justify-content: space-between;
    width: 23%;
`

export const BtnPlayerControl = styled.button`
    background-color: ${(props)=> (props.play ? "white" : "transparent")};
    border: none;
    width:36px;
    height: 36px;
    margin-bottom: 10px;
    border-radius: 30px;
    transition: 500ms;

    :hover {
        cursor: pointer;
        background-color: rgb(255 255 255/${(props)=> (props.play ? "70%" : "0%")});
    }
`
export const IconPlay = styled.img`
    margin: 3px 0px 0px 0px;
`
export const Loading = styled.img`
    position: relative;
    bottom: 12%;
`

export const DurationSlider = styled.input`
    -webkit-appearance: none;
    width: 80%;
    outline: none;
    height: 4px;
    border-radius: 5px;
    margin: 0 15px;

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
`

export const VolumeControl = styled(DurationSlider)`
    width: 25%;
    height: 3px;

    ::-webkit-slider-thumb{
        height: 12px;
        width: 12px;
        top: 0px;
    }
`
export const BtnIconVolume = styled(BtnPlayerControl)`
    width:30px;
    height: 30px;
    margin: 0px 5px;
    margin-bottom: 0px;
    transition: 0ms;
`

export const BtnLyrics = styled(BtnIconVolume)`
    opacity: ${(props)=> (props.lyrics ? "100%" : "60%")};
    filter: drop-shadow(0px 0px ${(props)=> (props.lyrics ? "8px" : "0px")} gray);
    :hover {
        opacity: 100%;
    }
`

export const BtnRepeat = styled(BtnIconVolume)`
    opacity: ${(props) => (props.loop ? "100%" : "60%")};
    filter: drop-shadow(0px 0px ${(props)=> (props.loop ? "8px" : "0px")} gray);
    :hover {
        opacity: 100%;
    }
`