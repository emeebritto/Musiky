import { request } from 'common/utils/request';

const suggestions = async({ total }: {total: number}) => {

    let { names } = await request('allArtistNames')
    let suggestionsList = [];

    while(suggestionsList.length < total){

    	let numRandom = ~~(Math.random() * names.length);
    	let artistName = names[numRandom]

        let hasSomeEvenName = suggestionsList.some(value => value == artistName);

        if (!hasSomeEvenName){
            suggestionsList.push(artistName)
        }  
    }
    return suggestionsList;
}

export default suggestions;
