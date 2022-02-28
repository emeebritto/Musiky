import React from 'react';
import Moment from 'react-moment';
import Styled from 'styled-components';

const Clock = Styled(Moment)`
	opacity: 0.9;
	font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
	margin: ${(props: {margin: string}) => (props.margin)}
`

interface TimeProps {
    margin?: string;
}

const Time: React.FC<TimeProps> = ({ margin='0' }) => {
	return (
		<Clock
			interval={10000}
			format="hh:mm"
			margin={margin}
		/>
	);
}

export default Time;
