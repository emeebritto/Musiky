import axios from 'axios';
import { Music, PlaylistProps } from 'common/types';
import {
  HomeContent,
  ExploreContent,
  SearchPageContent,
  WatchPageContent,
  ArtistPageContent
} from 'common/types/pagesSources';


// API WRAPPER
class MusikyApi {
  devENV: boolean;
  musikyApiDEV: string;
  musikyApiPROD: string;
  baseUrl: string;

  constructor() {
    this.devENV = process.env.NODE_ENV === 'development';
    this.musikyApiDEV = `http://localhost:${3000}/api`;
    this.musikyApiPROD = 'https://musiky.vercel.app/api';
    this.baseUrl = this.devENV ? this.musikyApiDEV : this.musikyApiPROD;
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
export default musikyApi;
