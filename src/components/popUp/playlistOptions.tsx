import React, { useState } from 'react';
import Styled from 'styled-components';
import { mediaDownload, multiDownloads, copyContent } from 'common/utils';
import { PlaylistProps } from 'common/types';
import { usePlayer } from 'contexts/player';
import { PopUp } from 'components';
import { istatic, musiky, n2xNordlyApi }  from "services";


const DataLinks = Styled.section`
  display: flex;
  flex-direction: row;
`
const EmbedLinks = Styled.section`
  margin: 10px 0;
`
const EmbedSwitch = Styled.section`
  display: flex;
  align-items: center;
`
const SwitchBtn = Styled.button`
  padding: 5px 10px;
  border: none;
  font-size: 1em;
  margin: 0 5px;
  background-color: ${(props) => (props.active ? "#091483" : "#091436")};
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
`
const QrcodeWrapper = Styled.section`
  margin: 15px 30px 20px 5px;
`
const Qrcode = Styled.img`
  width: 310px;
`
const Label = Styled.h2`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
`
const UrlField = Styled.section`
  display: flex;
  margin: 10px 0;
`
const Input = Styled.input`
  border: none;
  padding: 5px 10px;
  color: #fff;
  outline: none;
  background-color: #020207;
  border-radius: 8px;
`
const UrlInput = Styled(Input)`
  width: 395px;
`
const DownloadOptionInput = Styled(Input)`
  width: 100%;
`
const Btn = Styled.button`
  border: none;
  padding: 3px 10px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 6px;
`
const CopyBtn = Styled(Btn)`
  margin: 0 3px;
  background-color: #181318;
`
const DownloadBtn = Styled(Btn)`
  margin: 0 3px;
  background-color: #020222;
`
const DownloadOption = Styled.section`
  margin: 15px 0 0 20px;
`
const AvailableDownload = Styled.p`
  opacity: 0.7;
  margin: 15px 0 0 20px;
`


interface LayoutProps {
  showPopUp: boolean;
  setShowPopUp: (s: boolean) => void;
  playlist: PlaylistProps;
}

const PlaylistMoreOptions: React.FC<LayoutProps> = ({
  showPopUp,
  setShowPopUp,
  playlist
}) => {

  const { prop } = usePlayer();
  const [embedOption, setEmbedOption] = useState(0);


  const iframeHtml = (config:any):string => {
    let properties = ""
    for (const [key, value] of Object.entries(config)) {
      if (properties) properties += " ";
      properties += `${key}='${value}'`;
    }
    return `<iframe ${properties}></iframe>`;
  }

  const musicEmbed = iframeHtml({
    src: `${musiky.url}/embed/${prop.music?.id || "empty"}`,
    width: 600,
    height: 87
  })
  const playlistEmbed = iframeHtml({
    src: `${musiky.url}/embed/pl/${playlist?.id || "empty"}`,
    width: 600,
    height: 87
  })

  const embedCode = embedOption == 0 ? musicEmbed : playlistEmbed

  // useEffect(() => {
  //   updateEmbed()
  // }, [prop.music])


  return (
    <PopUp
      show={showPopUp}
      onRequestClose={()=> setShowPopUp(false)}
    >
      <DataLinks>
        <section>
          <Label>Playlist QRCODE</Label>
          <QrcodeWrapper>
            <Qrcode src={`${n2xNordlyApi.url}/qrcode?data=${location.href}`} alt="playlist qrcode"/>  
          </QrcodeWrapper>
        </section>
        <section>
          <section>
            <Label>Playlist URL:</Label>
            <UrlField>
              <UrlInput
                type='text'
                value={typeof window !== 'undefined' ? location.href : ''}
                readOnly
              />
              <CopyBtn onClick={()=> copyContent()}>
                <img
                  src={istatic.iconUrl({ name: "content_copy" })}
                  alt='copy icon'
                />
              </CopyBtn>
            </UrlField>
          </section>
          <section>
            <Label>Downloads:</Label>
            <DownloadOption>
              <Label>Now Playing:</Label>
              {prop.music &&
                <UrlField>
                  <DownloadOptionInput
                    type='text'
                    value={`${prop.music.artists[0]?.name || "Musiky"} - ${prop.music.title}`}
                    readOnly
                  />
                  <DownloadBtn onClick={()=> {
                    if (prop.music != null) mediaDownload(prop.music)
                  }}>
                    <img
                      src={istatic.iconUrl({ name: "file_download" })}
                      alt='download icon'
                    />
                  </DownloadBtn>
                </UrlField>
              }
              {!prop.music && <AvailableDownload>- Unavailable</AvailableDownload>}
            </DownloadOption>
            {Boolean(Object.keys(playlist).length) &&
              <DownloadOption>
                <Label>All Playlist:</Label>
                <UrlField>
                  <DownloadOptionInput
                    type='text'
                    value={`${playlist.infors.title} - (${playlist.list.length} Tracks)`}
                    readOnly
                  />
                  <DownloadBtn onClick={()=> {
                    // multiDownloads(playlist.list)
                    alert("this function is temporary unavailable");
                  }}>
                    <img
                      src={istatic.iconUrl({ name: "file_download" })}
                      alt='download icon'
                    />
                  </DownloadBtn>
                </UrlField>                        
              </DownloadOption>
            }
          </section>        
        </section>
      </DataLinks>
      <EmbedLinks>
        <EmbedSwitch>
          <Label>Embed: </Label>
          <SwitchBtn
            active={embedOption == 0}
            onClick={() => setEmbedOption(0)}
          >
            Music
          </SwitchBtn>
          <SwitchBtn
            active={embedOption == 1}
            onClick={() => setEmbedOption(1)}
          >
            Playlist
          </SwitchBtn>
        </EmbedSwitch>
          <UrlField>
            <DownloadOptionInput
              type='text'
              value={embedCode}
              readOnly
            />
            <CopyBtn onClick={()=> copyContent(embedCode)}>
              <img
                src={istatic.iconUrl({ name: "content_copy" })}
                alt='copy icon'
              />
            </CopyBtn>
          </UrlField>
      </EmbedLinks> 
    </PopUp>
  )
}

export default PlaylistMoreOptions;
