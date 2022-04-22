import React from "react";
import Link from 'next/link';
import Styled from "styled-components";
import { ArtistDataProps } from 'common/types';
import { formatValues } from 'helpers';


const Artist = Styled.a`
  position: relative;
  display: flex;
  text-align: center;
  text-decoration: none;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
  flex-direction: column;
  width: 150px;
  height: 305px;
  margin: 10px 15px;
`
const ArtistImg = Styled.img`
  border-radius: 100px;
  width: 155px;
  height: 155px;
  margin-bottom: 15px;
  transition: 400ms;

  :hover {
    border: 1px solid #fff;
  }

  @media(max-width: 545px) {
    width: 125px;
    height: 125px;
  }
`

const ArtistName = Styled.h1`
  color: #fff;
  min-height: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2em;

  @media(max-width: 545px) {
    font-size: 1.0em;
  }
`

const FollowesCounter = Styled.p`
  color: #7B7D83;
  height: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.1em;
  margin: 10px 0;

  @media(max-width: 545px) {
    font-size: 1.0em;
  }
`
const BrnFollow = Styled.button`
  border: none;
  background-color: rgb(0 0 0 /30%);
  border-radius: 16px;
  border: 1px solid #fff;
  cursor: pointer;
  color: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 1.2em;
  padding: 5px 30px;
  transition: 300ms;

  :hover {
    background-color: #fff;
    color: black;
  }

  @media(max-width: 545px) {
    font-size: 0.9em;
  }
`

interface ArtistCardProps {
  artist: ArtistDataProps;
  index?: number;
}


const ArtistCard: React.FC<ArtistCardProps> = ({ artist, index=0 }) => (
  <Link 
    href={`/artist/${artist.name.replace(/\W|_/gi, '')}`}>
    <Artist>
      <ArtistImg
        src={artist.images.length ? artist.images[1].url : ''}
        alt={`${artist.name} image`}
      />
      <ArtistName>{artist.name}</ArtistName>
      <section>
        <FollowesCounter>
          {formatValues(artist.followers.total)} Followes
        </FollowesCounter>
        <BrnFollow>Follow</BrnFollow>
      </section>
    </Artist>
  </Link>
)

export default ArtistCard;