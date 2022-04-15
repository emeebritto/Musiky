import React from 'react';
import { musikyApi } from 'services';
import type { NextPage, GetServerSideProps } from 'next';
import Styled from "styled-components";
import { ExploreContent } from 'common/types/pagesSources';
import { useSplashContext } from 'common/contexts/splash';
import { PlaylistsRow, DiskLibrary, TabTitle } from 'components';


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
  margin: 15vh 0 10vh 0;

  @media(max-width: 900px) {
    margin-top: 16vh;
  }
`

interface ExploreProps {
  pageContent: ExploreContent;
};

const Explore: NextPage<ExploreProps> = ({ pageContent }) => {

  const { desableSplash } = useSplashContext();
  if (pageContent) desableSplash();

  return (
    <>
    <TabTitle name={`Musiky - Explore`}/>
    <ViewPort>
      <Wrapper>
        <PlaylistsRow name='Explore List' data={pageContent.playlists.exploreList}/>
        <DiskLibrary name='long Songs | Ambient' data={pageContent.disks}/>
        <PlaylistsRow name='Explore new Sets' data={pageContent.playlists.exploreNewSets}/>
        <PlaylistsRow name='Another Sets' data={pageContent.playlists.anotherSets}/>
      </Wrapper>
    </ViewPort>
    </>
  )
}

export default Explore;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const pageContent = await musikyApi.explorePage().then(r => r.data);
  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}
