import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Styled from "styled-components";

import { BoxGreeting, BoxQuickPicks, PlaylistsRow, ArtistsRow } from 'components';


const ViewPort = Styled.section`
  overflow-y: scroll;
  width: 100%;
  height: 100vh;
`
const Wrapper = Styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20vh 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`


const Home: NextPage = () => {
  
  return (
    <div>
      <Head>
        <title>Musiky (in Development)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewPort>
          <Wrapper>
              <BoxGreeting/>
              <BoxQuickPicks/>
              <PlaylistsRow name='MIXs'/>
              <ArtistsRow maxResult={6}/>
              <PlaylistsRow name='Others MIXs'/>
              <PlaylistsRow name='Just Song'/>
          </Wrapper>
      </ViewPort>
    </div>
  )
}

export default Home
