import { createUrlParams } from 'helpers';
import axios from 'axios';
import { mapObjValues } from 'helpers';
import { CommentProps, Music, PlaylistProps, ArtistDataProps, Lyric } from 'common/types';

export interface DictionaryResponse {
  data:Array<{
    glossary:string;
    meta: {
      synsetType:string;
    }
  }>;
}

interface CommentsTreadParams {
  id:string;
  replyToken?:string;
  continuation?:string;
}

export interface CommentsTreadResponse {
  data: {
    comments:CommentProps[];
    continuation:string;
  };
}

export interface TranslateResponse {
  data: {
    text:string;
  };
}

export interface MusicResponse {
  data:Music;
}

export interface AllMusicsResponse {
  data: {
    page:number;
    provider:string;
    requestId:string;
    items:Music[] | string[];
  };
}

export interface MusicsDataParams {
  index?:number;
  id?:string;
  withArtist?:string;
  searchTitle?:string;
  filter?:string;
  random?:number;
  onlyTitle?:number;
  maxResult?:number;
  page?:number;
  maxPerPage?:number;
}

export interface MusicsResponse {
  data:Music[];
}

export interface ArtistsImgParams {
  sendFile?:string | number;
  size?:string | number;
  altId?:string | number;
}

export interface ArtistDataParams {
  index?:number;
  id?:string;
  altId?:string;
  searchName?:string;
  random?:number;
  onlyNames?:number;
  maxResult?:number;
  page?:number;
  maxPerPage?:number;
}

export interface ArtistsDataResponse {
  data:ArtistDataProps[];
}

export interface LyricResponse {
  data:Lyric;
}

export interface AllPlaylistsParams {
  categoryInput?:string;
  random?:number;
  withArtist?:string;
  musicsType?:string;
  maxPlaylists?:number | string;
  maxPerList?:number | string;
  minPerList?:number | string;
}

export interface AllPlaylistsResponse {
  data: {
    page:number;
    provider:string;
    requestId:string;
    items:PlaylistProps[];
  };
}

export interface EmotionsParams {
  id?:string;
  random?:number | string;
  maxResult?:number | string;
}

export interface EmotionsResponse {
  data:Music[];
}

// API WRAPPER
class Istatic {
  public devENV:boolean;
  private istaticDEV:string;
  private istaticPROD:string;
  public baseUrl:string;
  private staticSourcesUrl:string;
  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.istaticDEV = `http://localhost:${9872}`;
    this.istaticPROD = 'https://average-housecoat-clam.cyclic.app';
    this.baseUrl = this.devENV ? this.istaticDEV : this.istaticPROD;
    this.staticSourcesUrl = `${this.baseUrl}/static`;
  }

  profileImg(id:null | string = null): string {
    return `${this.baseUrl}/user-img/guest_temp`;
  }

  iconUrl({
    name, color='white', format='svg', dp=24
  }:{
    name:string,
    color?:string,
    format?:string,
    dp?:number
  }):string {
    return `${this.staticSourcesUrl}/icons/${name}_${color}_${dp}dp.${format}`; // local files 'public'
  }

  imgUrl({ path }:{ path:string }): string {
    return `${this.staticSourcesUrl}/imgs/${path}`;
  }

  animatedSvgUrl({ name }:{ name:string }): string {
    return `${this.staticSourcesUrl}/icons/AnimatedSvg/${name}.svg`; // local files 'public'
  }

  staticPath(pathName:string): Promise<any> {
    return axios.get(`${this.staticSourcesUrl}/${pathName}`);
  }

  dictionary({ word }:{ word:string }): Promise<DictionaryResponse> {
    return axios.get(`${this.baseUrl}/itools/dictionary?word=${word}`);
  }

  commentsTread(opt:CommentsTreadParams): Promise<CommentsTreadResponse> {
    const params:string = createUrlParams(opt);
    return axios.get(`${this.baseUrl}/comments?${params}`);
  }

  translate({ text }:{ text:string }): Promise<TranslateResponse> {
    return axios.post(`${this.baseUrl}/translate?to=pt`, { text });
  }

// TEMP <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  playlistData({ id }:{ id:string }): Promise<{data:PlaylistProps}> {
    return axios.get(`${this.baseUrl}/playlist/byId?id=${id}`);
  }

  musicsData(opt?:MusicsDataParams): Promise<MusicsResponse> {
    const params:string = createUrlParams(opt);
    return axios.get(`${this.baseUrl}/musics?${params}`);
  }

  artistsImgUrl(id:string, opt?:ArtistsImgParams): string {
    const params:string = createUrlParams(opt);
    return `${this.baseUrl}/artists/images/${id}?${params}`;
  }

  artistsData(opt?:ArtistDataParams): Promise<ArtistsDataResponse> {
    const params:string = createUrlParams(opt);
    return axios.get(`${this.baseUrl}/artists?${params}`);
  }

  lyric({ title, artistRef }:{ title:string, artistRef:string }): Promise<LyricResponse> {
    return axios.get(`${this.baseUrl}/musics/lyric?title=${title}&artistRef=${artistRef}`);
  }

  allPlaylists(opt?:AllPlaylistsParams): Promise<AllPlaylistsResponse> {
    const params:string = createUrlParams(opt);
    return axios.get(`${this.baseUrl}/playlist/all?${params}`);
  }

  emotions(opt?:EmotionsParams): Promise<EmotionsResponse> {
    const params:string = createUrlParams(opt);
    return axios.get(`${this.baseUrl}/emotions?${params}`);
  }
}

const istatic = new Istatic();
export default istatic;
