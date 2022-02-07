const { request } = require('../../external/api');


const autoComplete = async(value, maxResult=10) => {

    let { items } = await request('allMusics', '?allNames=1&maxResult=5000');
    let { names } = await request('allArtistNames');

    var selected = [];

    if (value.length > 0) {
        for (var i = 0; i < items.length; i++) {

            var exp = new RegExp(value, "i");
            var item = items[i];
            var name = names[i];
 
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

module.exports = autoComplete
