import React from "react";
import Styled from "styled-components";
import faker from 'faker';
import { SwiperSlide } from 'swiper/react';
import { ArtistDataProps } from 'common/types';
import { VerticalView, ArtistCard } from 'components';


const ArtistsProfile = Styled.section`
  display: flex;
  align-items: center;
  overflow-y: hidden;
  height: 305px;
  margin-bottom: 15px;

  ::-webkit-scrollbar {
    width: 0;
  }  
`

interface ArtistsRowProps {
  data: Array<ArtistDataProps>;
}


const ArtistsRow: React.FC<ArtistsRowProps> = ({ data }) => (
  <VerticalView
    viewLabel="Artists"
    btnOption={{
      displayName: "SEE ALL",
      href: '/artists'
    }}
    margin='20px 0'
  >
    <ArtistsProfile>
      {data.map((artist, index) => {
        return (
          <SwiperSlide
            key={index + faker.datatype.uuid()}
          >
          <ArtistCard artist={artist} index={index}/>
          </SwiperSlide>
        )
      })}
    </ArtistsProfile>
  </VerticalView>
)

export default ArtistsRow;