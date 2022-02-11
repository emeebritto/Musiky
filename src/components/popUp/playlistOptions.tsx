import React, { useState } from 'react';
import Styled from 'styled-components';
import { musicDownload, multiDownloads, copyContent } from 'common/utils';
import { PlaylistProps } from 'common/types';
import { usePlayerContext } from 'common/contexts/Player';
import { PopUp } from 'components';
import { istatic } from "api/istatic";


const Label = Styled.h2`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const UrlField = Styled.section`
    display: flex;
    margin: 10px 0;
`
const Input = Styled.input`
    border: none;
    padding: 5px 10px;
    color: #fff;
    outline: none;
    background-color: #020207;
    border-radius: 8px;
`
const UrlInput = Styled(Input)`
    width: 395px;
`
const DownloadOptionInput = Styled(Input)`
    width: 375px;
`
const Btn = Styled.button`
    border: none;
    padding: 3px 10px;
    background-color: transparent;
    cursor: pointer;
    border-radius: 6px;
`
const CopyBtn = Styled(Btn)`
    margin: 0 3px;
    background-color: #181318;
`
const DownloadBtn = Styled(Btn)`
    margin: 0 3px;
    background-color: #020222;
`
const DownloadOption = Styled.section`
    margin: 15px 0 0 20px;
`
const AvailableDownload = Styled.p`
    opacity: 0.7;
    margin: 15px 0 0 20px;
`


interface LayoutProps {
    showPopUp: boolean;
    setShowPopUp: (s: boolean) => void;
    playlist: PlaylistProps;
}

const PlaylistMoreOptions: React.FC<LayoutProps> = ({
    showPopUp,
    setShowPopUp,
    playlist
}) => {

    const { prop } = usePlayerContext();

    return (
        <PopUp show={showPopUp} onRequestClose={()=> setShowPopUp(false)}>
            <section>
                <Label>Playlist URL:</Label>
                <UrlField>
                    <UrlInput
                        type='text'
                        value={typeof window !== 'undefined' ? location.href : ''}
                        readOnly
                    />
                    <CopyBtn onClick={()=> copyContent()}>
                        <img src={istatic.copyIcon()} alt='copy icon'/>
                    </CopyBtn>
                </UrlField>
            </section>
            <section>
                <Label>Downloads:</Label>
                <DownloadOption>
                    <Label>Now Playing:</Label>
                    {prop.music &&
                        <UrlField>
                            <DownloadOptionInput
                                type='text'
                                value={`${prop.music.artists[0]} - ${prop.music.title}`}
                                readOnly
                            />
                            <DownloadBtn onClick={()=> {
                                if (prop.music != null) musicDownload(prop.music)
                            }}>
                                <img src={istatic.downloadIcon()} alt='download icon'/>
                            </DownloadBtn>
                        </UrlField>
                    }
                    {!prop.music && <AvailableDownload>- Unavailable</AvailableDownload>}
                </DownloadOption>
                {Boolean(Object.keys(playlist).length) &&
                    <DownloadOption>
                        <Label>All Playlist:</Label>
                        <UrlField>
                            <DownloadOptionInput
                                type='text'
                                value={`${playlist.infors.title} - (${playlist.infors.length} Tracks)`}
                                readOnly
                            />
                            <DownloadBtn onClick={()=> multiDownloads(playlist.list)}>
                                <img src={istatic.downloadIcon()} alt='download icon'/>
                            </DownloadBtn>
                        </UrlField>                        
                    </DownloadOption>
                }
            </section>
        </PopUp>
    )
}

export default PlaylistMoreOptions;
