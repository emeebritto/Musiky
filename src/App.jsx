import React, {useState, useEffect} from "react";
import {dataBase as data, PlayingNow} from "./dataBase";
import { GlobalStyle } from "./components/GlobalStyle";
import styled from "styled-components";
import { BrowserRouter as Router, useRouteMatch, Route, Switch } from 'react-router-dom'

import Header from "./components/header/header";
import Home from "./components/home/home";
import Explore from "./components/explore/explore"
import PlayList from "./components/playlist/playlist"
import PlayerControl from "./components/playerControl/playerControl";
import Player from "./components/player/player";

const Background = styled.section`
    position: fixed;
`
const Blur = styled.div`
    backdrop-filter: blur(7px);
    -webkitBackdrop-filter: blur(7px);
`
const ViewPort = styled.section` 
    background-color: rgb(0 0 0 /95%);
    overflow: scroll;
    width: 100vw;
    height: 100vh;
    ::-webkit-scrollbar {
	    height: 0px;
	}
`

const Centralize = styled.section`
	display: flex;
    justify-content: center; 
`

function App() {

	const [background, setBackground] = useState('')

	const updateBackground = (targetIndex, targetList) => {
		setBackground(targetList[targetIndex].snippet.thumbnails.medium.url)
	}

    useEffect(()=>{
        PlayingNow.subscribe(updateBackground)

        return ()=> {
        	PlayingNow.unsubscribe(updateBackground)
        }

    },[])

	return (
		<Router>
			<Background style={{ background: `url(${background}) no-repeat center/100%`}}>
				<Blur>
					<ViewPort>
						<GlobalStyle />
						<Player playingNow={PlayingNow}/>
						<Header/>

						<Centralize>
							<Switch>
								<Route exact path={"/"}>
									<Home playingNow={PlayingNow}/>
								</Route>
								<Route path={"/explore/"}>
									<Explore/>
								</Route>
								<Route path={"/library/"}>
									<Explore/>
								</Route>
					            <Route path={`/playList/:id`}>
	                                <PlayList playingNow={PlayingNow}/>
	                            </Route>
							</Switch>
						</Centralize>
		                
						<PlayerControl playingNow={PlayingNow}/>
					</ViewPort>
				</Blur>
			</Background>
		</Router>
	);
}

export default App;
