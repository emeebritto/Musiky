import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import { withRouter, NextRouter } from 'next/router';
import { musikyApi } from 'services';
import Styled from 'styled-components';
import { usePlayer } from 'contexts/player';
import { ArtistDataProps, Music, SearchReturn } from 'common/types';
import { ArtistCard, MusicList } from 'components';

const ViewPort = Styled.section`
	margin: 30px 0;
`

const Label = Styled.h1`
	font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
	margin: 0 0 40px 0;
	font-size: 1.2em;
	color: #fff;
`

const FirstSection = Styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
`

const MusicListWrapper = Styled.section`
	width: 40vw;
	margin-left: 80px;
`

const Hr = Styled.hr`
	margin: 30px 0;
	opacity: 20%;
`

interface WithRouterProps {
  router: NextRouter;
}

const ResultSearch: React.FC<WithRouterProps> = ({ router }) => {

	const { load } = usePlayer();
	const [searchResult, setSearchResult] = useState<SearchReturn | null>(null);
	const [error, setError] = useState(false);

	const q = String(router.query?.q || '');

	const startMedia = (playIndex: number): void => {
		if (!searchResult || !searchResult.musics.length) return;
		load({ media: musics[playIndex] });
	};

  useEffect(() => {
    async function getData() {
      let res = await musikyApi.search(q)
      	.then(r => r.data)
      	.catch(err => console.error(err));

      if (!res) return setError(true);
      // res.musics.length = 5;
      setSearchResult(res);
    }
    getData()
  },[q])

  if (error) return(<><p>sorry, unavailable service</p></>);
  if (!searchResult) return(<><p>Searching for {q}...</p></>);
  
  const { searchTop, musics, artists } = searchResult;
  if (!searchTop) return(<><p>{q} - not Found (404)</p></>);

	return (
		<ViewPort>
			<Label>Resultado para: {searchTop.name}</Label>
			<FirstSection>
				<ArtistCard artist={searchTop}/>
				<MusicListWrapper>
					<MusicList
						list={musics}
						listId={searchResult.requestId}
						startMedia={startMedia}
					/>
				</MusicListWrapper>
			</FirstSection>
			<Hr/>
		</ViewPort>
	);
}

export default withRouter(ResultSearch);
