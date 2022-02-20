import React/*, { useState, useEffect }*/ from 'react';
import Styled from 'styled-components';
import { Music } from 'common/types';

const EmotionBox = Styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 145px;
  height: 210px;
  border-radius: 8px;
  margin: 10px 8px;
  cursor: pointer;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.5);
  background: url(${(props: {backImg: string}) => (props.backImg)}) no-repeat center/320%;
`
const ProfileImgWrapper = Styled.section`
  background-image: linear-gradient(180deg, #8200FF, #7740E9, #2235FF);
  border-radius: 50%;
  box-shadow: 0 0 30px #000;
  margin: 10px 0;
`
const ProfileImg = Styled.img`
  width: 60px;
  margin: 3px;
  border-radius: 50%;
`

interface Props {
	children?: React.ReactNode;
	source: Music;
}

const EmotionPreviewBox: React.FC<Props> = ({ source }) => {

	return (
    <EmotionBox backImg={source.thumbnails[2].url}>
      <ProfileImgWrapper>
        <ProfileImg src={source.sourceBy.thumbnails[1].url}/>                    
      </ProfileImgWrapper>
    </EmotionBox>
	);
}

export default EmotionPreviewBox;
