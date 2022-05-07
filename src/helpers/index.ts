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
		if (!value) continue;
	  newObj[key] = type(value);
	}

	return newObj;
};

export const createUrlParams = (obj:Obj | undefined): string => {
	if (!obj) return '';
	obj = mapObjValues(obj, value => String(value));
	return new URLSearchParams(obj).toString();
}

export const sleep = (fc:any, time:number): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(()=> {
      fc();
      resolve();
    }, time);
  })
};

export const whenExecutable = async(executable:any): Promise<any> => {
	return new Promise(async(resolve, reject) => {
		try {
			const result = await executable();
			resolve(result);
		} catch(err) {
			await sleep(() => whenExecutable(executable), 100);
		}
	});
}