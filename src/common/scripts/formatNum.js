const { formatNumerals }  = require('format-numerals');

export const formatValues = value => {
    let formatedValue = formatNumerals(value, {comma: 2}).split(',');

    if(formatedValue.length === 3){
        return `${formatedValue[0]}.${formatedValue[1][1]}M Followes`
    }
    if(formatedValue.length === 2){
        return `${formatedValue[0]}.${formatedValue[1][1]}K Followes`
    }

    return `${formatedValue[0]} Followes`
}
