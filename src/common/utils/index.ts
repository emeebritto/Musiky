import axios from 'axios';
import { Music, UnavailableMusic } from 'common/types';

interface MusicListenOptions {
    videoMode?: number;
    source?: string;
}

export const mediaDownload = async(media: Music, options?: MusicListenOptions): Promise<void> => {
    if (!media) return
    const { videoMode=0 } = options || {};
    await axios({
        url:`https://musiky-listen.herokuapp.com/${media.id}?videoMode=${videoMode}&source=yt`,
        method:'GET',
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL
            .createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${media.artists[0]} - ${media.title}.mp3`);
        document.body.appendChild(link);
        link.click();
    })
}
export const multiDownloads = async(list: Array<Music>): Promise<void> => {
    for (let i=0; i < list.length; i++) {
        await mediaDownload(list[i]);
    }
}
export const copyContent = (): void => {
    navigator.clipboard.writeText(location.href).then(()=> alert('copied'))
}
export const fromSecondsToTime = (secondsRaw: number): string => {
    let sec_num = Number(secondsRaw.toFixed(0)); //parseInt(secondsRaw, 10);
    let hours: number | string = Math.floor(sec_num / 3600);
    let minutes: number | string = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds: number | string = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = 0 + hours;}
    if (minutes < 10) {minutes = "0" + minutes;}
    if (seconds < 10) {seconds = "0" + seconds;}
    return `${(hours ? (hours + ':') : '') + minutes + ':' + seconds}`;
}
export const verifyUnavailable = async(
    list: Array<Music>
): Promise<Array<Music | UnavailableMusic>> => {
    let newList: Array<Music | UnavailableMusic> = [...list];
    for (let i=0; i < list.length; i++) {
        const musicId: string = list[i].id;
        newList[i] = await axios.get(`https://i.ytimg.com/vi/${musicId}/default.jpg`)
            .then(res => newList[i])
            .catch(err => {
                return {
                    id: list[i].id,
                    unavailable: true,
                    thumbnails: list[i].thumbnails,
                    reason: 'Deleted'
                };
            })            
    }
    return newList;
};

export const sleep = (fc: any, time: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            fc();
            resolve();
        }, time);
    })
};
