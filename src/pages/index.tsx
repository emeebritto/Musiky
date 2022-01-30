import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { BaseUrl } from 'api';
import Head from 'next/head';
import Image from 'next/image';
import Styled from 'styled-components';
import cache from "memory-cache";
import { HomeContent } from 'common/types/pagesSources';
import { useSplashContext } from 'common/contexts/splash';

import {
  Featured,
  BoxGreeting,
  BoxQuickPicks,
  PlaylistsRow,
  ArtistsRow
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

  const { desableSplash } = useSplashContext();

  if(pageContent) desableSplash();
  
  return (
    <div>
      <Head>
        <title>Musiky (in Development)</title>
      </Head>
      <ViewPort>
          <Wrapper>
              <Featured data={pageContent.recommendations}/>
              <BoxGreeting data={pageContent.greeting}/>
              <BoxQuickPicks data={pageContent.quickPicks}/>
              <PlaylistsRow name='MIXs' data={pageContent.playlists.mixs}/>
              <ArtistsRow data={pageContent.artists}/>
              <PlaylistsRow name='Others MIXs' data={pageContent.playlists.otherMixs}/>
              <PlaylistsRow name='Just Song' data={pageContent.playlists.justSongs}/>
          </Wrapper>
      </ViewPort>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async(context) => {
  const URL = `${BaseUrl}/page/home`;
  let pageContent = {};

  const cachedResponse = cache.get(URL);
  if (cachedResponse) {
    pageContent = cachedResponse;
  } else {
    pageContent = await axios.get(URL).then(r => r.data);
    cache.put(URL, pageContent, 60 * 60000);
  }
  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}
