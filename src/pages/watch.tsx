import React, { useState, useEffect, useRef } from 'react';
import type { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { musikyApi } from 'services';
import Styled from 'styled-components';
import istatic from 'services/istatic';
import { mediaDownload } from 'common/utils';
import { CommentProps } from 'common/types';
import { WatchPageContent } from 'common/types/pagesSources';
import { usePlayer } from 'common/contexts/player';
import { useSplashContext } from 'common/contexts/splash';
import {
	TabTitle,
	Comment,
	WatchPlayer
} from 'components';


const ViewPort = Styled.section`
	overflow-y: scroll;
	display: flex;
	justify-content: center;
	background-color: #020309;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	width: 96.4vw;
	height: 100vh;
`
const Wrapper = Styled.section`
	margin-top: 12vh;
	z-index: 10;
`
const Hr = Styled.hr`
	opacity: .05;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || 0};
		width: ${props.size? props.size : "100%"};
	`)}
`
const Media = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const AboutContent = Styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 53vw;
	margin: 20px 0;
`
const ArtistsProfile = Styled.img`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	margin: 0 15px 0 0;
`
const MetaData = Styled.section`
	width: 75%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
`
const MediaTitle = Styled.p`
	margin: 0 0 10px 0;
	font-weight: bold;
	font-size: 1.4em;
`
const ArtistName = Styled.p`
	opacity: 0.7;
	font-size: 1em;
	cursor: pointer;
`
const Actions = Styled.section`
	display: flex;
`
const ActionWrapper = Styled.section`
	margin: 5px 15px 0 0;
	display: flex;
	align-items: center;
	cursor: pointer;
	border-radius: 7px;
	transition: 400ms;
	:hover {
		background-color: rgba(255, 255, 255, 0.05)
	}
`
const Action = Styled.img`
	padding: 5px;
	cursor: pointer;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || '0 8px'};
		width: ${props.size || "28px"};
	`)}
`
const InputCommentsField = Styled.section`
	display: flex;
	align-items: center;
`
const UserImg = Styled.img`
	border-radius: 50%;
	${(props: {margin?: string, size?: string}) => (`
		margin: ${props.margin || '0 15px 0 25px'};
		width: ${props.size || "50px"};
		height: ${props.size || "50px"};
	`)}
`
const CommentData = Styled.section`
	width: 80%;
`
const UserName = Styled.section`
  ${(props: {width?: string, bold?: boolean, opacity?: number}) => (`
  	width: ${props.width ? props.width : "170px"};
  	opacity: ${props.opacity ? props.opacity : 1};
  	${props.bold ? "font-weight: bold;" : ""}
  `)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Count = Styled.p`
	${(props: {margin?: string, size?: string, opacity?: number}) => (`
		margin: ${props.margin};
		font-size: ${props.size};
		opacity: ${props.opacity};
	`)}
`
const Icon = Styled.img`
	opacity: .9;
	padding: 5px;
	cursor: pointer;
	${(props: {margin?: string, size: string}) => (`
		margin: ${props.margin || 0};
		width: ${props.size? props.size : "30px"};
	`)}
`
const InputComment = Styled.textarea`
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: #010512;
	padding: 10px 10px;
	resize: none;
	width: 45vw;
	height: 30px;
	max-height: 80px;
	transition: 400ms;

	:focus {
		outline: 2px solid #012A7B;
		height: 50px;
	}
`
const CommentsWrapper = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 20px;
	width: 50vw;
`
const NoComments = Styled.p`
	opacity: .7;
	margin: 10px 20px;
`
const LoadNewZone = Styled.img`
  width: 40px;
  height: 40px;
  margin: 20px 0;
`

interface Props {
	pageContent: WatchPageContent;
}

const Watch: NextPage<Props> = ({ pageContent }) => {
  const router = useRouter();
  const { desableSplash } = useSplashContext();
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [continuation, setContinuation] = useState('');
  const [snippetComments, setSnippetComments] = useState(0);
  const zoneRef = useRef<HTMLImageElement | null>(null);
  const {
  	prop,
  	load
  } = usePlayer();

  const init = async() => {
		if (!prop.music) {
			load({ media: pageContent.media });
		}
  };

  useEffect(()=> {
  	if (!router.query.v) return;
  	init();
  }, [router.query.v])

  useEffect(()=>{
  	setSnippetComments(0);
  	setContinuation('');
  	setComments([]);
  },[prop.music]);

 useEffect(() => {
  async function getData() {
  	const mediaId = prop.music ? prop.music.id : null;
  	if (snippetComments > 1 && !continuation || !mediaId) return;

    await istatic.commentsTread({ mediaId, continuation })
      .then(r => {
      	setComments((currentValue: CommentProps[]) => [...currentValue, ...r.data.comments]);
	    	setContinuation(r.data.continuation);
      })
      .catch(err => console.error(err));
  }
  if (snippetComments) getData();
},[snippetComments]);

  useEffect(() => {
    const node = zoneRef?.current; // DOM Ref
    if (!node) return;
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setSnippetComments((currentValue: number) => currentValue + 1);
      }
    })
    intersectionObserver.observe(node);
    return () => intersectionObserver.disconnect();
  }, [zoneRef.current]);

	if (prop.music) desableSplash();
  if (!prop.music) return(<></>);

	return (
		<ViewPort>
		<TabTitle name={`Musiky - Watch`}/>
		<Wrapper>
			<Media>
				<WatchPlayer/>
		    <AboutContent>
		    	<ArtistsProfile
		    		src={
		    			prop.music?.snippetArtistsData[0]
			    			? prop.music.snippetArtistsData[0].images[1].url
			    			: prop.music.sourceBy.thumbnails[1].url
		    		}
		    		alt='artist profile image'
		    	/>
			    <MetaData>
				    <MediaTitle contentEditable={true}>{prop.music.title}</MediaTitle>
				    <ArtistName>
				    	{prop.music.artists[0] || prop.music.sourceBy.name}
				    </ArtistName>
			    </MetaData>
			    <Actions>
			    	<Action
			    		src={istatic.iconUrl({ name: "favorite_border" })}
			    		alt="I'm love it"
			    	/>
			    	<Action
			    		onClick={()=> {
			    			if (!prop.music) return;
			    			mediaDownload(prop.music, {videoMode: 1})
			    		}}
			    		src={istatic.iconUrl({ name: "file_download" })}
			    		alt="download"
			    	/>
			    	<Action src={istatic.iconUrl({ name: "share" })} alt="share"/>
			    </Actions>
		    </AboutContent>
		    <Hr margin='20px 0'/>
		    <InputCommentsField>
		  		<UserImg size='44px' src={istatic.profileImg(null)} alt='user image'/>
		  		<InputComment placeholder="what are your feeling?"/>
		  		<Icon
		  			size='28px'
		  			margin='0 10px'
		  			src={istatic.iconUrl({ name: "send" })}
		  			alt='send comment'
		  		/>
			  </InputCommentsField>
		  	<CommentsWrapper>
		  		{!comments && <NoComments>No comments</NoComments>}
		  		{!!comments && comments.map((cmm: CommentProps, i: number) => {
		  			return (
		  				<Comment cmm={cmm}/>
		  			);
		  		})}
		  		{(continuation != null) &&
		  			<LoadNewZone
		  				ref={zoneRef}
		  				src={istatic.animatedSvgUrl({ name: "loading-jump_black" })}
		  				alt='loading comments'
		  			/>
		  		}
		  	</CommentsWrapper>
		  </Media>
	  </Wrapper>
		</ViewPort>
	);
}

export default Watch;

export const getServerSideProps: GetServerSideProps = async(context) => {
	const mediaId = String(context.query?.v || '');
  const pageContent = await musikyApi.watchPage({ mediaId }).then(r => r.data);

  return {
    props: { pageContent }, // will be passed to the page component as props
  }
}
