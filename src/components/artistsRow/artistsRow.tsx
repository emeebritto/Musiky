import React from "react";
import Styled from "styled-components";
import { ArtistDataProps } from 'common/types';
import { VerticalView, ArtistCard } from 'components';


const ArtistsProfile = Styled.section`
    display: flex;
    align-items: center;
    overflow-y: hidden;
    height: 295px;
    margin-bottom: 15px;

    ::-webkit-scrollbar {
        width: 0;
    }  

`

interface ArtistsRowProps {
    data: Array<ArtistDataProps>;
}


const ArtistsRow: React.FC<ArtistsRowProps> = ({ data }) => {
    
    return (
        <VerticalView viewLabel="Artists" btnOption={{
            displayName: "SEE ALL",
            href: '/artists'
        }}>
            <ArtistsProfile>
                {data.map((artist, index) => {
                    return (
                        <ArtistCard artist={artist} index={index} key={index}/>
                    )
                })}
            </ArtistsProfile>
        </VerticalView>
    )
}

export default ArtistsRow