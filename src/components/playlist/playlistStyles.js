import Styled from "styled-components";

export const S = {
    PlaylistInfor: Styled.section`
        position: fixed;
        left: 17%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 22%;
    `,
    MusicList: Styled.section`
        display: flex;
        flex-direction: column;
        width: 60%;
    `,
    BackIcon: Styled.img`
        width: 35px;
        margin-bottom: 25px;
        :hover {
            cursor: pointer;
            background-color: rgb(255 255 255 /4%);
        }
    `,
    PlayListImg: Styled.img`
        width: 75%;
        border-radius: 10px;
        box-shadow: 1px 1px 30px rgb(0 0 0 / 35%);
        margin-bottom: 15px;
    `,
    PlaylistTitle: Styled.p`
        color: white;
        font-size: 1.4em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin-bottom: 10px;
    `,
    BoxMusic: Styled.section`
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        border-radius: 5px;
        padding: 5px;
        :hover {
            cursor: pointer;
            background-color: rgb(255 255 255 / 4%);
        }
        :hover .iconPlayHover {
            display: ${(props)=> (props.hoverOff ? "none" : "inline-block")};
        }
        :hover .MusicTime {
            display: none;
        }
    `,
    BoxNumMusic: Styled.div`
        text-align: center;
        margin: 35px 3px 0px 3px;
        width: 25px;
        height: 100%;
    `,
    NumMusic: Styled.p`
        color: rgb(255 255 255/ 70%);
    `,
    MusicImg: Styled.img`
        width: 15%;
        border-radius: 6px;
        margin-right: 14px;
    `,
    MusicInfor: Styled.section`
        width: 70%;
    `,
    MusicTitle: Styled.p`
        color: white;
        font-size: 1.1em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    `,
    BoxIconPLayHover: Styled.img`
        display: none;
        filter: invert(100%);
    `
}

export const Ss = {
    PlaySubTitle: Styled(S.PlaylistTitle)`
        color: #C4C4C4;
        font-size: 1.1em;
    `,
    ChannelName: Styled(S.NumMusic)`
        margin-top: 5px;
        font-size: 0.9em;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    `,
    MusicTime: Styled(S.NumMusic)`
    `,
}