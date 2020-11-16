// @ts-ignore-line
import { template as uTemplate, templateSettings } from 'underscore';

templateSettings.interpolate = /\{\{(.+?)\}\}/g;

export const isBoolean = (n: any): boolean => typeof n === 'boolean';

export const cloneObj = <T>(obj: object): T => JSON.parse(JSON.stringify(obj));

export const template = (str: string, params: object): string => {
	const compiled = uTemplate(str);
	return compiled(params);
};
