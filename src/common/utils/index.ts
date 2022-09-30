import axios from 'axios';
import { musikyStreamApi } from 'services';
import { Music } from 'common/types';

interface MusicListenOptions {
  videoMode?:number;
  source?:string;
}

export const mediaDownload = async(media:Music, options?:MusicListenOptions): Promise<void> => {
  if (!media) return;
  const { videoMode=0, source='yt' } = options || {};
  const url = `${musikyStreamApi}/${media.id}?videoMode=${videoMode}&source=${source}&format=mp3`;

  await axios({
    url: url,
    method:'GET',
    responseType: 'blob'
  })
  .then(res => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${media.artists[0].name} - ${media.title}.mp3`);
    document.body.appendChild(link);
    link.click();
  })
}

export const multiDownloads = async(list:Music[]): Promise<void> => {
  for (let i=0; i < list.length; i++) {
    const media = list[i];
    await mediaDownload(media);
  }
}

export const copyContent = (content?:string): void => {
  navigator.clipboard.writeText(content || location.href).then(()=> alert('copied'))
}

export const fromSecondsToTime = (secondsRaw:number): string => {
  let sec_num = Number(secondsRaw.toFixed(0));
  let hours:number | string = Math.floor(sec_num / 3600);
  let minutes:number | string = Math.floor((sec_num - (hours * 3600)) / 60);
  let seconds:number | string = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = 0 + hours;}
  if (minutes < 10) {minutes = "0" + minutes;}
  if (seconds < 10) {seconds = "0" + seconds;}
  return `${(hours ? (hours + ':') : '') + minutes + ':' + seconds}`;
}

export const verifyUnavailable = async(list:Music[]): Promise<Music[]> => {
  let newList:Music[] = [...list];
  for (let i:number = 0; i < list.length; i++) {
    let musicId:string = list[i].id;
    try {
      await axios.get(`https://i.ytimg.com/vi/${musicId}/default.jpg`)
    } catch(err) {
      newList[i].unavailable = true
    }
  }
  return newList;
};

export const sleep = (fc:any, time:number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      fc();
      resolve();
    }, time);
  })
};
