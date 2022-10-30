import { createUrlParams } from 'helpers';
import { Playlist } from "common/types";
import axios from 'axios';


interface GetHearderParams {
  authorization:string;
  clientToken:string;
  host:string;
  contentType?:string;
}

const getHearder = ({
  authorization,
  clientToken,
  host,
  contentType
}:GetHearderParams):any => ({
  "Host": host,
  "Content-Type": contentType || "",
  "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0",
  "Accept": "application/json",
  "Accept-Language": "en",
  "Accept-Encoding": "gzip, deflate, br",
  "Referer": "https://open.spotify.com/",
  "app-platform": "WebPlayer",
  "spotify-app-version": "1.1.98.597.g7f2ab0d4",
  "client-token": clientToken,
  "Origin": "https://open.spotify.com",
  "DNT": "1",
  "Sec-Fetch-Dest": "empty",
  "Sec-Fetch-Mode": "cors",
  "Sec-Fetch-Site": "same-site",
  "Sec-GPC": "1",
  "authorization": authorization,
  "Connection": "keep-alive"
});

// API WRAPPER
class DSpot {
  public DSpotURL:string;
  private authorization?:string;
  private clientToken?:string;
  private client_id?:string;
  private client_secret?:string;
  constructor() {
    this.DSpotURL = 'https://api.spotify.com/v1';
    this.authorization = process.env.AUTHORIZATION;
    this.clientToken = process.env.CLIENT_TOKEN;
    this.client_id = process.env.CLIENT_ID;
    this.client_secret = process.env.CLIENT_SECRET;
  }


  getAccessToken() {
    return axios({
      url: '/get_access_token?reason=transport&productType=web-player',
      baseURL: 'https://open.spotify.com',
      method:'get',
      headers: {
        "Host": "open.spotify.com",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0",
        "Accept": "application/json",
        "Accept-Language": "en",
        "Accept-Encoding": "gzip, deflate, br",
        "app-platform": "WebPlayer",
        "spotify-app-version": "1.1.98.597.g7f2ab0d4",
        "DNT": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Sec-GPC": "1",
        "Referer": "https://open.spotify.com/",
        "Connection": "keep-alive",
        "Cookie": `sp_dc=${process.env.SP_DC}; sp_key=${process.env.SP_KEY}; sp_t=${process.env.SP_T}; OptanonConsent=isIABGlobal=false&datestamp=Sun+Oct+30+2022+05%3A34%3A46+GMT-0300+(Brasilia+Standard+Time)&version=6.26.0&hosts=&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf02%3A1%2Cm02%3A1%2Ct02%3A0&landingPath=NotLandingPage&AwaitingReconsent=false; sp_m=br; sp_phash=3978a0bf28aedf514f129cf4d4c3506c968d6cc1; sp_gaid=0088fcfeb0a425eaac03b8556d57f02776407f15dea8f658e2b703; spot=%7B%22t%22%3A1664080718%2C%22m%22%3A%22br%22%2C%22p%22%3Anull%7D; sp_landing=https%3A%2F%2Fopen.spotify.com%2F%3Fsp_cid%3De01742779dbda227bfea5de64fb56a92%26device%3Ddesktop`,
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "TE": "trailers"
      }
    }).then(r => r.data.accessToken).catch(err => console.log({ err }));
  }

  getClientToken() {
    return axios({
      url: "/v1/clienttoken",
      baseURL: "https://clienttoken.spotify.com",
      method: "POST",
      headers: {
        "Host": "clienttoken.spotify.com",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:106.0) Gecko/20100101 Firefox/106.0",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Content-Length": "206",
        "Origin": "https://open.spotify.com",
        "DNT": "1",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
        "Referer": "https://open.spotify.com/",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache",
        "TE": "trailers"
      },
      data: JSON.stringify({"client_data":{"client_version":"1.1.98.597.g7f2ab0d4","client_id":process.env.CLIENT_ID,"js_sdk_data":{"device_brand":"unknown","device_model":"desktop","os":"Linux","os_version":"unknown"}}})
    }).then(r => r.data.granted_token.token)
  }

  async playlist(id:string): Promise<{data:Playlist}> {
    const access_token = await this.getAccessToken();
    const clientToken = await this.getClientToken();
    return axios({
      url: `${this.DSpotURL}/playlists/${id}?fields=collaborative,description,followers(total),images,name,owner(display_name,id,images,uri),public,tracks,uri&additional_types=track,episode&offset=0&limit=25&market=from_token`,
      method: "GET",
      headers: getHearder({
        authorization: `Bearer ${access_token}`,
        clientToken: clientToken,
        host: "api.spotify.com"
      })
      // `Bearer ${authorization}`
    });
  }

  async artist(uri:string) {
    const access_token = await this.getAccessToken();
    const clientToken = await this.getClientToken();
    return axios({
      url: `/query?operationName=queryArtistOverview&variables={"uri":"${uri}"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"4e752c6e24b0c8b97d63466a0670ffb5fbd1de8f985e99cc52285174a139c96a"}}`,
      baseURL: 'https://api-partner.spotify.com/pathfinder/v1',
      method:'get',
      headers: getHearder({
        authorization: `Bearer ${access_token}`,
        clientToken: clientToken,
        host: "api-partner.spotify.com",
        contentType: "application/json;charset=UTF-8"
      })
    });
  }

  // musicsData(opt?:MusicsDataParams): Promise<MusicsResponse> {
  //   const params:string = createUrlParams(opt);
  //   return axios.get(`${this.DSpotURL}/musics?${params}`);
  // }

  // artistsImgUrl(id:string, opt?:ArtistsImgParams): string {
  //   const params:string = createUrlParams(opt);
  //   return `${this.DSpotURL}/artists/images/${id}?${params}`;
  // }

  // artistsData(opt?:ArtistDataParams): Promise<ArtistsDataResponse> {
  //   const params:string = createUrlParams(opt);
  //   return axios.get(`${this.DSpotURL}/artists?${params}`);
  // }

  // lyric({ title, artistRef }:{ title:string, artistRef:string }): Promise<LyricResponse> {
  //   return axios.get(`${this.DSpotURL}/musics/lyric?title=${title}&artistRef=${artistRef}`);
  // }

  // allPlaylists(opt?:AllPlaylistsParams): Promise<AllPlaylistsResponse> {
  //   const params:string = createUrlParams(opt);
  //   return axios.get(`${this.DSpotURL}/playlist/all?${params}`);
  // }

  // emotions(opt?:EmotionsParams): Promise<EmotionsResponse> {
  //   const params:string = createUrlParams(opt);
  //   return axios.get(`${this.DSpotURL}/emotions?${params}`);
  // }
}

const dSpot = new DSpot();
export default dSpot;




  // getAccessToken() {
  //   const params = new URLSearchParams();
  //   params.append('grant_type', 'client_credentials');
  //   return axios({
  //     url: '/token',
  //     baseURL: 'https://accounts.spotify.com/api',
  //     method:'post',
  //     headers: {
  //       'Authorization': 'Basic ' + (new Buffer(this.client_id + ':' + this.client_secret).toString('base64')),
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     data: params,
  //   }).then(r => r.data.access_token).catch(err => console.log({ err }));
  // }