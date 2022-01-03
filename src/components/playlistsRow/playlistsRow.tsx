import React from 'react';
import Link from 'next/link';
import Styled from "styled-components";
import { usePlayerContext } from 'common/contexts/Player';
import { msk_get } from 'api';
import { istatic } from 'api/istatic';
import { PlaylistProps } from 'common/types';
import { VerticalView } from 'components';


const PlayList = Styled.section`
    position: relative;
    display: flex;
    text-decoration: none;
    justify-content: space-around;
    flex-direction: column;
    width: 150px;
    height: 240px;
    margin: 0 15px;
    transition: 100ms;

    :hover {
        cursor: pointer;
        transform: translateY(-5px);
    }

    :hover #BtnPLayHover {
        display: inline-block;
    }

`
const BtnPLayHover = Styled.button`
    display: none;
    border: none;
    position: absolute;
    background-color: #131313;
    cursor: pointer;
    z-index: 2;
    width: 40px;
    height: 40px;
    top: 105px;
    left: 97px;
    border-radius: 19px;
    box-shadow: 5px 5px 30px black;
`
const ShadowHover = Styled.section`
    position: absolute;
    top: 0px;
    left: -1px;
    width: 40px;
    height: 40px;
    z-index: 0;
    border-radius: 60px;
    background-color: rgb(0 0 0 / 30%);
    transition: 400ms;

    :hover {
        transform: scale(3.7);
    }
`

const BtnPLayHoverImg = Styled.img`
    width: 100%;
    margin-top: 2px;
    filter: invert(100%);
`

const PlayListImg = Styled.img`
    position: relative;
    border-radius: 10px;
    width: 150px;
    height: 150px;
`

const PlayListTitle = Styled.h1`
    color: white;
    height: 40px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 1.2em;
    margin: 0px 0px 5px 5px;
`
const Description = Styled.p`
    color: white;
    color: rgb(255 255 255/ 65%);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-left: 5px;
`


interface PlayListRowProps {
    name: string;
    data: Array<PlaylistProps>
}

const PlayListRow: React.FC<PlayListRowProps> = ({ name, data }) => {

    const { load } = usePlayerContext()

    const startList = async(playlistId: string): Promise<void> => {
        let playlist = await msk_get('playlist', { id: playlistId });
        load(0, playlist.list, playlistId);
    }
    
    return (
        <VerticalView viewLabel={name}>
            {data.map((playlist, index) => {
                return (
                    <Link 
                        href={`/playlist/${playlist.infors.playlistId}`}
                        key={index}>
                        <PlayList>
                        	<PlayListImg 
                                id="PlayListImg" 
                                src={playlist.infors.img}/>
                            <BtnPLayHover 
                                onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    startList(playlist.infors.playlistId)
                                }}
                                id="BtnPLayHover">
                                <BtnPLayHoverImg src={istatic.iconPlay()} alt="play icon"/>
                                <ShadowHover></ShadowHover>
                            </BtnPLayHover>
                        	<section>
                        		<PlayListTitle>{playlist.infors.title}</PlayListTitle>
                        		<Description>{playlist.infors.length} • Tracks</Description>
                        	</section>
                        </PlayList>
                    </Link>
                )
            })}
        </VerticalView>
    )
}

export default PlayListRow