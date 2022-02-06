import React from 'react';
import Head from 'next/head';
import { usePlayerContext } from 'common/contexts/Player';

interface TabTitleProps {
    name: string;
}

const TabTitle: React.FC<TabTitleProps> = ({ name }) => {
	const { prop } = usePlayerContext();
	if (prop.music) {
		return (
			<Head>
				<title>Playing: { prop.music.title }</title>
			</Head>
		)
	}
	return (
		<Head>
			<title>{ name }</title>
		</Head>
	)
}



export default TabTitle;