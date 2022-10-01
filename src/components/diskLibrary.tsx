import React from "react";
import faker from 'faker';
import Styled from 'styled-components';
import { SwiperSlide } from 'swiper/react';
import { Music } from 'common/types';
import { VerticalView } from 'components';
import { usePlayer } from 'contexts/player';
import { PlaylistProps } from 'common/types';
import { istatic } from 'services';


const ViewPort = Styled.section`
`
const DiskWrapper = Styled.section`
  display: flex;
  align-items: center;
  height: 260px;
  margin-bottom: 30px;
`
const TitleSection = Styled.h2`
  color: white;
  font-size: 1.6em;
  margin: 0 0 16px 18px;
  font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  @media(max-width: 900px) {
    margin-left: 18px;
    margin-bottom: 23px;
  }

  @media(max-width: 545px) {
    font-size: 1.4em;
  }
`
const Disk = Styled.section`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 230px;
  margin: 0 15px;

  :hover {
  	cursor: pointer;
  }

  :hover #diskImg {
  	transform: rotate(360deg);
  }
`
const DiskImg = Styled.section`
  position: relative;
	border-radius: 360px;
	width: 150px;
  height: 150px;
  margin-bottom: 15px;
  transition: 400ms;
  ${(props: { playing:boolean, img:string }) => (`
    animation: ${props.playing ? "spin infinite 30s linear" : ""};
    background: url(${props.img}) no-repeat center/177.5%;
  `)}

  @keyframes spin {
	  to {
	    transform: rotate(360deg);
	  }
  }
`
const CenterHole = Styled.section`
  position: absolute;
	border-radius: 360px;
	width: 20px;
  height: 20px;
  background-color: black;
  top: 65px;
  left: 65px;
`
const DiskTitle = Styled.h1`
	color: white;
	width: 130px;
	height: 34px;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	font-size: 1.1em;
	margin: 0px 0px 5px 5px; 
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 10px;
`
const DiskTotalTime = Styled.p`
	color: white;
	color: rgb(255 255 255/ 65%);
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin-left: 5px;
`

interface DiskLibraryProps {
  name: string;
  data: {
    id: string;
    list: Music[];
  };
}

const DiskLibrary: React.FC<DiskLibraryProps> = ({ name, data }) => {
  const { load, isPlayingId } = usePlayer();
  const playSong = (index: number): void => {
    load({ media: data.list[index] });
  };
	return(
    <VerticalView viewLabel={name}>
			<DiskWrapper>
        {data.list.map((disk, i) => {
          return (
            <SwiperSlide
              key={i + faker.datatype.uuid()}
            >
            <Disk onClick={()=> playSong(i)} key={disk.id}>
              <DiskImg 
                playing={isPlayingId(disk.id)} 
                id={isPlayingId(disk.id) ? '' : 'diskImg'}
                img={istatic.baseUrl + disk.thumbnails[1].url}
              >
                <CenterHole/>
              </DiskImg>
            	<section>
            		<DiskTitle>{disk.title}</DiskTitle>
            		<DiskTotalTime>{disk.duration}</DiskTotalTime>
            	</section>
            </Disk>
            </SwiperSlide>
          )
        })}
			</DiskWrapper>
    </VerticalView>
	)
}

export default DiskLibrary;
