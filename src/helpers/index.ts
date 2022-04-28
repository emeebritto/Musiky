import { formatNumerals } from 'format-numerals';
import { Obj } from 'common/types';


export const formatValues = (value:number | string): string => {
	const valueStr = String(value);
	const formatedValue: string[] = formatNumerals(parseInt(valueStr), { comma: 2 }).split(',');

	if (formatedValue.length === 3) return `${formatedValue[0]}.${formatedValue[1][1]}M`;
	if (formatedValue.length === 2) return `${formatedValue[0]}.${formatedValue[1][1]}K`;
	return formatedValue[0];
};

export const mapObjValues = (obj:Obj | undefined, type:(s:any) => any) => {
	if (!obj) return {};
	const newObj:Obj = {};
	for (const [key, value] of Object.entries(obj)) {
	  newObj[key] = type(value);
	}

	return newObj;
};

export const createUrlParams = (obj:Obj | undefined): string => {
	if (!obj) return '';
	obj = mapObjValues(obj, value => String(value));
	return new URLSearchParams(obj).toString();
}
