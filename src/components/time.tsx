import React from 'react';
import Moment from 'react-moment';
import Styled from 'styled-components';
//import { useFeaturedContext } from 'common/contexts/Featured';

const Clock = Styled(Moment)`
	opacity: 0.9;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin: ${(props: {margin: string}) => (props.margin)}
`

interface TimeProps {
  margin?: string;
}
const Time: React.FC<TimeProps> = ({ margin='0' }) => {
	//const { preLoad } = useFeaturedContext();
	return (
		<Clock
			//onChange={(val: string) => {
			//	let time = val.split(/:|\s/g);
			//	if (time[1] === '00') {
			//		preLoad('6Ga-a0kEr8k');
			//	}
			//}}
			interval={10000}
			format="hh:mm A"
			margin={margin}
		/>
	);
}

export default Time;
