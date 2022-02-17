const { formatNumerals }  = require('format-numerals');

export const formatValues = value => {
    let formatedValue = formatNumerals(parseInt(value), {comma: 2}).split(',');

    if(formatedValue.length === 3){
        return `${formatedValue[0]}.${formatedValue[1][1]}M`
    }
    if(formatedValue.length === 2){
        return `${formatedValue[0]}.${formatedValue[1][1]}K`
    }

    return `${formatedValue[0]}`
}
