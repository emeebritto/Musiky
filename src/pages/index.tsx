import React, { useEffect, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import Styled from 'styled-components';
import { musiky } from 'services';
import { HomeContent } from 'common/types/pages';
import { useSplashContext } from 'contexts/splash';

import {
  Featured,
  BoxGreeting,
  BoxQuickPicks,
  YourFlow,
  PlaylistsRow,
  ArtistsRow,
  TabTitle
} from 'components';

const ViewPort = Styled.section`
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
  margin: 0 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`

interface HomeProps {
  pageContent: HomeContent;
};

const Home: NextPage<HomeProps> = ({ pageContent }) => {

  const {
    recommendations,
    greeting,
    quickPicks,
    yourFlow,
    playlists,
    artists
  } = pageContent;

  const { desableSplash } = useSplashContext();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const node = ref?.current // DOM Ref
    if (!node) return;
    node.scrollTo({
      top: 220,
      left: 0,
      behavior: 'smooth'
    });
  },[])

  if (pageContent) desableSplash();
  
  return (
    <div>
      <TabTitle name={`Musiky (in Development)`}/>
      <ViewPort ref={ref}>
          <Wrapper>
              <Featured data={recommendations}/>
              <BoxGreeting data={greeting}/>
              <BoxQuickPicks data={quickPicks}/>
              {true && <YourFlow data={yourFlow}/>}
              <PlaylistsRow name='MIXs' data={playlists.mixs}/>
              <ArtistsRow data={artists}/>
              <PlaylistsRow name='Others MIXs' data={playlists.otherMixs}/>
              <PlaylistsRow name='Just Song' data={playlists.justSongs}/>
          </Wrapper>
      </ViewPort>
    </div>
  )
}

export default Home;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const pageContent = await musiky.api.homePage().then(r => r.data);
  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}
