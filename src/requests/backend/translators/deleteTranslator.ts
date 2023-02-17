import { TranslatorsCacheStorage } from '../../../app/Background/TranslatorsCacheStorage';
import { buildBackendRequest } from '../../utils/requestBuilder';
import { type } from '../../../lib/types';

import * as db from './data';
import { formatToCustomTranslatorId } from '.';
import { applyTranslators } from './applyTranslators';

export const [deleteTranslatorFactory, deleteTranslator] = buildBackendRequest(
	'deleteTranslator',
	{
		requestValidator: type.number,

		factoryHandler: () => async (translatorId) => {
			// Delete translator
			await db.deleteTranslator(translatorId);
			await applyTranslators();

			// Delete translator cache
			const cache = new TranslatorsCacheStorage(
				formatToCustomTranslatorId(translatorId),
			);
			await cache.clear();
		},
	},
);
