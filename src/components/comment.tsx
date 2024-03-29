import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';
import istatic from 'services/istatic';
import { CommentProps } from 'common/types';
import { usePlayer } from 'contexts/player';

const ViewPort = Styled.section`
	display: flex;
	width: 100%;
	margin: 15px 0;
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
const AboutCommentUser = Styled.section`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`
const CommentText = Styled.p`
	color: #fff;
	width: 25em;
	overflow: hidden;
`
const TranslateBtn = Styled.button`
	border: none;
	background-color: transparent;
	color: #305BE8;
	font-size: 0.9em;
	padding: 5px;
	margin: 5px 0;
	cursor: pointer;
`
const TranslateText = Styled.p`
	margin: 5px 0 12px 0;
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
	background-color: ${(props:{active?:boolean}) => (
		props.active ? "rgba(255, 255, 255, 0.05)" : "transparent"
	)};
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
const RepliesWrapper = Styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: calc(100% - 25px);
	margin: 15px 0 0 17px;
	border-left: 2px solid #3041C6;
`
const Reply = Styled.section`
	display: flex;
	width: 100%;
	margin: 10px 0;
`
const LoadMoreBtn = Styled.button`
	border: none;
	background-color: transparent;
	color: #305BE8;
	font-size: .9em;
	padding: 5px 20px;
	cursor: pointer;
`
const GoToTopBtn = Styled.a`
	outline: none;
	text-decoration: none;
	color: #305BE8;
	font-size: .9em;
	padding: 5px 20px;
	cursor: pointer;
`

interface Props {
	cmm: CommentProps;
}

const Comment: React.FC<Props> = ({ cmm }) => {
	const { prop } = usePlayer();
	const [replies, setReplies] = useState<CommentProps[]>([]);
	const [translate, setTranslate] = useState('');
	const [repliesContinuation, setRepliesContinuation] = useState('');
	const [loadingReplies, setLoadingReplies] = useState(false);
	const mediaId = prop.music ? prop.music.id : null;

	const getReplies = async(replyToken: string): Promise<void> => {
		if (!cmm.numReplies || !mediaId) return;
		setLoadingReplies(true);
		const repliesData = await istatic.commentsTread({ id: mediaId, replyToken })
			.then(r => r.data)
		setReplies((replies: CommentProps[]): CommentProps[] => (
			[...replies, ...repliesData.comments]
		));
		setLoadingReplies(false);
		setRepliesContinuation(repliesData.continuation);
	};

	const translateComment = async(): Promise<void> => {
		const translatedText = await istatic
			.translate({ text: cmm.text.replace(/<br>/ig, '\n')})
			.then(r => r.data)
			.catch(err => console.error(err))
		if (translatedText) setTranslate(translatedText.text);
	};

	return (
		<ViewPort>
			<UserImg id={cmm.commentId} size='40px' src={cmm.authorThumb[1].url} alt='user image'/>
			<CommentData>
				<AboutCommentUser>
					<UserName opacity={0.8} width='190px' bold>{cmm.author}</UserName>
					<Count size='0.9em' margin='0 0' opacity={0.7}>{cmm.time}</Count>
				</AboutCommentUser>
				<CommentText>{cmm.text.replace(/<br>/ig, '\n')}</CommentText>
				<TranslateBtn onClick={()=> {
						translate.length
							? setTranslate('')
							: translateComment();
					}}
				>
					{!!translate.length? 'Hide' :'See'} Translate • PT-BR
				</TranslateBtn>
				{!!translate.length &&
					<TranslateText>{translate}</TranslateText>
				}
				<Actions>
					<ActionWrapper
						onClick={() => {
							if (loadingReplies) return;
							replies.length
								? setReplies([])
							  : getReplies(cmm.replyToken)
						}}
						active={!!replies.length}
					>
			    	<Action
			    		size='25px'
			    		margin='0'
			    		src={
			    			loadingReplies
					    		?	istatic.animatedSvgUrl({ name: "loading-jump_black" })
					    		:	istatic.iconUrl({ name: "chat_bubble_outline" })
			    		}
			    		alt="replies"
			    	/>
			    	<Count size='0.93em' margin='0 8px' opacity={0.7}>{cmm.numReplies}</Count>
		    	</ActionWrapper>
					<ActionWrapper>
			    	<Action
			    		size='25px'
			    		margin='0'
			    		src={istatic.iconUrl({ name: "favorite_border" })}
			    		alt="I'm love it"
			    	/>
			    	<Count size='0.93em' margin='0 8px' opacity={0.7}>{cmm.likes}</Count>
					</ActionWrapper>
		    </Actions>
		    <RepliesWrapper>
				{replies.map((rep: CommentProps, i: number) => (
					<Reply>
						<UserImg size='40px' src={rep.authorThumb[1].url} alt='user image'/>
						<CommentData>
							<AboutCommentUser>
								<UserName opacity={0.8} width='190px' bold>{rep.author}</UserName>
								<Count size='0.9em' margin='0 0' opacity={0.7}>{rep.time}</Count>
							</AboutCommentUser>
							<CommentText>{rep.text.replace(/<br>/ig, '\n')}</CommentText>
							<Actions>
								<ActionWrapper>
						    	<Action
						    		size='25px'
						    		margin='0'
						    		src={istatic.iconUrl({ name: "favorite_border" })}
						    		alt="I'm love it"
						    	/>
						    	<Count size='0.93em' margin='0 8px' opacity={0.7}>{rep.likes}</Count>
								</ActionWrapper>
					    </Actions>
				    </CommentData>
					</Reply>
				))}
				{(!!replies.length && repliesContinuation) &&
					<section>
						<LoadMoreBtn 
							onClick={()=> {
								if (loadingReplies) return;
								getReplies(repliesContinuation)
							}}
						>
							{loadingReplies ? '. . .' : 'SHOW MORE'}
						</LoadMoreBtn>
						<GoToTopBtn href={`#${cmm.commentId}`}>GO TO TOP</GoToTopBtn>
					</section>
				}
				</RepliesWrapper>
			</CommentData>
		</ViewPort>
	);
}

export default Comment;
