import { request } from 'common/utils/request';
import { Music } from 'common/types';

const autoComplete = async({
    input,
    maxResult=10
}:{
    input: string,
    maxResult: number
}): Promise<string[]> => {

    let { items } = await request('allMusics', '?allNames=1&maxResult=5000');
    let namesList = await request('allArtistNames');

    var selected = [];

    if (input.length > 0) {
        for (var i = 0; i < items.length; i++) {

            var exp = new RegExp(input, "i");
            var item = items[i];
            var name = namesList[i];
 
            let hasSomeEvenMusic = selected.some(value => value === item);
            if (exp.test(item) && !hasSomeEvenMusic) {
                selected.push(item.replace(/^ /g, ''));
            }

            let hasSomeEvenArtist = selected.some(value => value === name);
            if (exp.test(name) && !hasSomeEvenArtist) {
                selected.push(name);
            }

            if(selected.length >= maxResult) return selected
        }
    }
    
    return selected;
}

export default autoComplete;
