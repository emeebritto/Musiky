import React, { createContext, useState } from 'react';
import { AccountContextData, DataHistory } from 'common/types';


export const AccountContext = createContext<AccountContextData>({} as AccountContextData);
AccountContext.displayName = 'Account';

interface LayoutProps {
	children: React.ReactNode;
}

export const AccountProvider: React.FC<LayoutProps> = ({ children }) => {
	
	const [auth, setAuth] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [userId, setUserId] = useState('');
	const [profileImg, setProfileImg] = useState('');
	const [history, setHistory] = useState<DataHistory[]>([]);

	return (
		<AccountContext.Provider value={{
			auth,
			setAuth,
			displayName,
			setDisplayName,
			userId,
			setUserId,
			profileImg,
			setProfileImg,
      history,
      setHistory
		}}>
			{ children }
		</AccountContext.Provider>
	)
}
