import axios from 'axios';
import { Music, PlaylistProps, SearchReturn } from 'common/types';
import {
  HomeContent,
  ExploreContent,
  SearchPageContent,
  WatchPageContent,
  ArtistPageContent
} from 'common/types/pages';


class MusikyClient {
  private devENV:boolean;
  private musikyDEV:string;
  private musikyPROD:string;
  public url:string;


  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.musikyDEV = `http://localhost:${3000}`;
    this.musikyPROD = 'https://musiky.vercel.app';
    this.url = this.devENV ? this.musikyDEV : this.musikyPROD;
  }
}

// API WRAPPER
class MusikyApi {
  public devENV: boolean;
  private musikyApiDEV: string;
  private musikyApiPROD: string;
  public baseUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.musikyApiDEV = `http://localhost:${3000}/api`;
    this.musikyApiPROD = 'https://musiky.vercel.app/api';
    this.baseUrl = this.devENV ? this.musikyApiDEV : this.musikyApiPROD;
  }

  autoComplete({ input }:{ input:string }): Promise<{data:string[] | []}> {
    return axios.get(`${this.baseUrl}/autoComplete?input=${input}`);
  }

  search(query:string): Promise<{data:SearchReturn}> {
    return axios.get(`${this.baseUrl}/search?q=${query}`);
  }

  homePage(): Promise<{data:HomeContent}> {
    return axios.get(`${this.baseUrl}/pages/home`);
  }

  explorePage(): Promise<{data:ExploreContent}> {
    return axios.get(`${this.baseUrl}/pages/explore`);
  }

  searchPage(): Promise<{data:SearchPageContent}> {
    return axios.get(`${this.baseUrl}/pages/search`);
  }

  watchPage({ mediaId }:{ mediaId:string }): Promise<{data:WatchPageContent}> {
    return axios.get(`${this.baseUrl}/pages/watch?v=${mediaId}`);
  }

  emotions(opt?:{ id?:string, random?:number, maxResult?:number }): Promise<{data:Music[]}> {
    const { id='', random=1, maxResult=10 } = opt || {};
    return axios.get(`${this.baseUrl}/emotions?id=${id}&random=${random}&maxResult=${maxResult}`);
  }

  playlist(opt:{ id:string }): Promise<{data:PlaylistProps}> {
    const { id } = opt;
    return axios.get(`${this.baseUrl}/playlist/${id}`);
  }

  artist(opt:{ id:string }): Promise<{data:ArtistPageContent}> {
    const { id } = opt;
    return axios.get(`${this.baseUrl}/artist/${id}`);
  }
}

const musikyApi = new MusikyApi();
const musikyClient = new MusikyClient();

export default {
  url: musikyClient.url,
  api: musikyApi
};
