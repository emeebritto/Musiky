import React/*, { useState, useEffect }*/ from 'react';
import { istatic } from "services";
import Styled from 'styled-components';

const ViewPort = Styled.button`
  position: relative;
  margin-top: 8px;
  border: none;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover #username-text {
    display: inline;
  }
`
const ProfileImg = Styled.img`
  border-radius: 50%;
  width: 85%;
  height: 90%;

  @media(max-width: 670px) {
    width: 35px;
    height: 35px;
  }
`
const UserName = Styled.p`
  position: absolute;
  display: none;
  left: 70px;
  top: 50px;
  padding: 5px 10px;
  background-color: #000;
  border-radius: 8px;
`

interface ProcImgProps {
	isLogged:boolean;
	label:string;
	altLabel?:string;
	onClick?:(() => void);
}

const ProfileImage: React.FC<ProcImgProps> = ({ isLogged, label, altLabel='', onClick }) => {

	const imageURL = isLogged
		? istatic.profileImg()
		: istatic.iconUrl({ name: "account_circle" })

	return (
    <ViewPort onClick={onClick}>
      <ProfileImg
        src={imageURL}
        alt="Profile Image"
      />
      <UserName id="username-text">{label || altLabel}</UserName>
    </ViewPort>
	);
}

export default ProfileImage;
