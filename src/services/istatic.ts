import axios from 'axios';
import { CommentProps, Music, PlaylistProps, ArtistDataProps, Lyric } from 'common/types';

export interface DictionaryResponse {
  data: Array<{
    glossary: string;
    meta: {
      synsetType: string;
    }
  }>;
}

export interface commentsTreadResponse {
  data: {
    comments: CommentProps[];
    continuation: string;
  };
}

export interface TranslateResponse {
  data: {
    text: string;
  };
}

export interface MusicResponse {
  data: Music;
}

export interface AllMusicsResponse {
  data: {
    page: number;
    provider: string;
    requestId: string;
    items: Music[];
  };
}

export interface AllArtistsResponse {
  data: {
    page: number;
    provider: string;
    requestId: string;
    items: ArtistDataProps[];
  }; 
}

export interface LyricResponse {
  data: Lyric;
}

export interface AllPlaylistsResponse {
  data: {
    page: number;
    provider: string;
    requestId: string;
    items: PlaylistProps[];
  };
}

export interface EmotionsResponse {
  data: Music[];
}

// API WRAPPER
class Istatic {
  devENV: boolean;
  istaticDEV: string;
  istaticPROD: string;
  baseUrl: string;
  staticSourcesUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.istaticDEV = `http://localhost:${9872}`;
    this.istaticPROD = 'https://cdn-istatics.herokuapp.com';
    this.baseUrl = this.devENV ? this.istaticDEV : this.istaticPROD;
    this.staticSourcesUrl = `${this.baseUrl}/static`;
  }

  profileImg(id: null | string = null): string {
    return `${this.baseUrl}/user-img/guest_temp`;
  }

  iconUrl({
    name, color='white', format='svg', dp=24
  }:{
    name: string,
    color?: string,
    format?: string,
    dp?: number
  }): string {
    return `${this.staticSourcesUrl}/icons/${name}_${color}_${dp}dp.${format}`;
  }

  imgUrl({ path }:{ path: string }): string {
    return `${this.staticSourcesUrl}/imgs/${path}`;
  }

  animatedSvgUrl({ name }:{ name: string }): string {
    return `${this.staticSourcesUrl}/icons/AnimatedSvg/${name}.svg`;
  }

  staticPath(pathName: string): Promise<any> {
    return axios.get(`${this.staticSourcesUrl}/${pathName}`);
  }

  dictionary({ word }:{ word: string }): Promise<DictionaryResponse> {
    return axios.get(`${this.baseUrl}/itools/dictionary?word=${word}`);
  }

  commentsTread({
    mediaId,
    replyToken,
    continuation
  }:{
    mediaId: string,
    replyToken?: string,
    continuation?: string
  }): Promise<commentsTreadResponse> {
    return axios.get(`${this.baseUrl}/comments?id=${mediaId}&replyToken=${replyToken || ''}&continuation=${continuation || ''}`);
  }

  translate({ text }:{ text: string }): Promise<TranslateResponse> {
    return axios.post(`${this.baseUrl}/translate?to=pt`, { text });
  }

  musicData({ id }:{ id: string }): Promise<MusicResponse> {
    return axios.get(`${this.baseUrl}/music/${id}`);
  }

  allMusicsData({ page, random, maxResult }:{ page?: number, random?: number, maxResult?: number }): Promise<AllMusicsResponse> {
    return axios.get(`${this.baseUrl}/music/all?page=${page || 1}&random=${random || 0}&maxResult=${maxResult || ''}`);
  }

  allArtistsData({ page }:{ page: number }): Promise<AllArtistsResponse> {
    return axios.get(`${this.baseUrl}/artists/all?page=${page || 1}`);
  }

  lyric({ title, artistRef }:{ title: string, artistRef: string }): Promise<LyricResponse> {
    return axios.get(`${this.baseUrl}/music/lyric?title=${title}&artistRef=${artistRef}`);
  }

  allPlaylists(options?: string): Promise<AllPlaylistsResponse> {
    return axios.get(`${this.baseUrl}/playlist/all?${options || ""}`);
  }

  emotions(options?: string): Promise<EmotionsResponse> {
    return axios.get(`${this.baseUrl}/emotions?${options || ""}`);
  }
}

const istatic = new Istatic();
export default istatic;
