import type { NextPage, GetServerSideProps } from 'next';
import axios from 'axios';
import { BaseUrl } from 'api';
import Head from 'next/head';
import Image from 'next/image';
import Styled from 'styled-components';
import { HomeContent } from 'common/types/pagesSources';

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

interface HomeProps {
  pageContent: HomeContent;
};

const Home: NextPage<HomeProps> = ({ pageContent }) => {
  
  return (
    <div>
      <Head>
        <title>Musiky (in Development)</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewPort>
          <Wrapper>
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
    let pageContent = await axios.get(`${BaseUrl}/page/home`).then(r => r.data);
    return {
        props: { pageContent }, // will be passed to the page component as props
    }
}
