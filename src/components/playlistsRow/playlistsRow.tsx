import React from 'react';
import Link from 'next/link';
import { usePlayerContext } from 'common/contexts/Player';
import { msk_get } from 'api';
import { istatic } from "api/istatic";
import { VerticalView } from "components";

import {
    PlayList, 
    BtnPLayHover, 
    BtnPLayHoverImg, 
    ShadowHover,
    PlayListImg, 
    PlayListTitle, 
    Description
} from './playlistsRowStyles';


interface PlayListRowProps {
    name: string;
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