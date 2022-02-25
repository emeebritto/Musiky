import { request } from 'common/utils/request';

const suggestions = async({ total }: {total: number}) => {

    let namesList = await request('allArtistNames')
    let suggestionsList = [];

    while(suggestionsList.length < total){

    	let numRandom = ~~(Math.random() * namesList.length);
    	let artistName = namesList[numRandom]

        let hasSomeEvenName = suggestionsList.some(value => value == artistName);

        if (!hasSomeEvenName){
            suggestionsList.push(artistName)
        }  
    }
    return suggestionsList;
}

export default suggestions;
