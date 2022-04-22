import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Styled from "styled-components";
import { useSplashContext } from 'contexts/splash';
import { TabTitle } from 'components';


const ViewPort = Styled.section`
  background-color: #000;
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
`

const Wrapper = Styled.section`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15vh 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`

const Wormhole = Styled.img`
  width: 270px;
  margin: 25px 0;
  border-radius: 50%;
`
const Text = Styled.p`
  margin: 25px 0;
  font-size: 1.5em;
`

const Community: NextPage = () => {

  const { desableSplash } = useSplashContext();
  if (true) desableSplash();

  return (
    <>
    <TabTitle name={`Musiky - Community`}/>
    <ViewPort>
      <Wrapper>
        <Wormhole
          src='https://cdn-istatics.herokuapp.com/static/imgs/illustrations/wormhole-gaef555396.jpg'
          alt='wormhole'
        />
        <Text>There's nothing around here...</Text>
      </Wrapper>
    </ViewPort>
    </>
  )
}

export default Community;
