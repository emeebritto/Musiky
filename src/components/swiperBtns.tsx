import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { useSwiper } from 'swiper/react';
import { istatic } from 'api/istatic';

const SwiperBtnStyle = Styled.img`
  position: absolute;
  z-index: 10;
  top: 42%;
  width: 40px;
  border-radius: 50%;
  background-color: #060512;
  cursor: pointer;
  box-shadow: 0 0 20px #000;
  opacity: ${(props: {visible: boolean}) => (
    props.visible ? "1" : "0"
  )};
`
const RightBtn = Styled(SwiperBtnStyle)`
  right: -2%;
  transform: rotate(-90deg);
`
const LeftBtn = Styled(SwiperBtnStyle)`
  left: -2%;
  transform: rotate(90deg);
`

const SwiperBtns = () => {
	const swiper = useSwiper();
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	const updateStatus = () => {
		setIsBeginning(swiper.isBeginning);
		setIsEnd(swiper.isEnd);
	};
	const slideNext = () => {
		swiper.slideNext();
		updateStatus();
	};
	const slidePrev = () => {
		swiper.slidePrev();
		updateStatus();
	};

  return (
    <>
      <RightBtn
      	onClick={slideNext}
      	src={istatic.expand_more_white()}
      	alt='RightBtn'
        visible={!isEnd}
      />
      <LeftBtn
      	onClick={slidePrev}
      	src={istatic.expand_more_white()}
      	alt='LeftBtn'
        visible={!isBeginning}
      />
    </>
  );
}

export default SwiperBtns;
