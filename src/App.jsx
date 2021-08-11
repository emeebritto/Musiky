import React, {useState, useEffect} from "react";
import { player } from "./controllers/player";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from "./components/header";
import Home from "./components/home";
import Explore from "./components/explore"
import PlayList from "./components/playlist"
import PlayerControl from "./components/playerControl";
import ReactPlayerComp from "./components/player";

import { GlobalStyle } from "./components/GlobalStyle";
import styled from "styled-components";


const Background = styled.section`
    position: fixed;
`
const Blur = styled.div`
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


const App = () => {

	const [background, setBackground] = useState('')

	const updateBackground = (targetIndex, targetList) => {
		setBackground(targetList[targetIndex].snippet.thumbnails.medium.url)
	}

    useEffect(()=>{
        player.setBackgroundFunction(updateBackground)
    },[])

	return (
		<Router>
			<Background style={{ background: `url(${background}) no-repeat center/100%`}}>
				<Blur>
					<ViewPort>
						<GlobalStyle />
						<ReactPlayerComp player={player}/>
						<Header player={player}/>

						<Centralize>
							<Switch>
								<Route exact path={"/"}>
									<Home player={player}/>
								</Route>
								<Route path={"/explore/"}>
									<Explore player={player}/>
								</Route>
								<Route path={"/library/"}>
									<Explore/>
								</Route>
					            <Route path={`/playList/:id`}>
	                                <PlayList player={player}/>
	                            </Route>
							</Switch>
						</Centralize>

						<PlayerControl player={player}/>
					</ViewPort>
				</Blur>
			</Background>
		</Router>
	);
}

export default App;

/*

    backdrop-filter: blur(7px);
    -webkitBackdrop-filter: blur(7px);

*/