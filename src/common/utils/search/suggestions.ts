import { istatic } from 'services';


const suggestions = async({ total }:{ total:number }): Promise<string[]> => {
  const artistsNames: string[] = await istatic
    .artistsData({ random: 1, onlyNames: 1, maxResult: total })
    .then(r => r.data.map(artist => artist.name));

  return artistsNames;
}

export default suggestions;
