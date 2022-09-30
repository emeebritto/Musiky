import React from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Styled from "styled-components";


const Alert = Styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #020309;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
  z-index: 97;
`


const PlaylistEmbed: NextPage = () => {

  const goToMusiky = () => {
    window.open('https://musiky.vercel.app', '_blank');
  };

  return (
    <>
    <Head>
      <title>Musiky - Unavailable</title>
    </Head>
    <Alert onClick={goToMusiky}>
      Musiky - Sorry, This Page is Unavailable For Now
    </Alert>
    </>
  )
}

export default PlaylistEmbed;
