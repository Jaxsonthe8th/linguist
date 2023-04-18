import { langCode, langCodeWithAuto } from '@translate-tools/core/types/Translator';
import { ITranslateOptions } from '@translate-tools/core/util/Scheduler/IScheduler';

import { buildBackendRequest } from '../utils/requestBuilder';

export const [translateFactory, translateRequest] = buildBackendRequest<
	{
		text: string;
		from: langCodeWithAuto;
		to: langCode;
		options?: ITranslateOptions;
	},
	string
>('translate', {
	factoryHandler:
		({ backgroundContext }) =>
			async ({ text, from, to, options }) => {
				const translateManager = await backgroundContext.getTranslateManager();
				const scheduler = translateManager.getScheduler();

				return scheduler.translate(text, from, to, options);
			},
});

export const translate = (
	text: string,
	from: string,
	to: string,
	options?: ITranslateOptions,
) =>
	translateRequest({
		text,
		from: from as langCodeWithAuto,
		to: to as langCode,
		options,
	});
