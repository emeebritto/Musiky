import React, { createContext, useState } from 'react';
import { AccountContextData } from 'common/types';


export const AccountContext = createContext<AccountContextData>({} as AccountContextData);
AccountContext.displayName = 'Account';

interface LayoutProps {
	children: React.ReactNode;
}

export const AccountProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [auth, setAuth] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [profileImg, setProfileImg] = useState('');
	const [history, setHistory] = useState([]);

	return (
		<AccountContext.Provider value={{
			auth,
			setAuth,
			displayName,
			setDisplayName,
			profileImg,
			setProfileImg,
      history,
      setHistory
		}}>
			{ children }
		</AccountContext.Provider>
	)
}
