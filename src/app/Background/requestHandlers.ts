// Request handlers
import { updateConfigFactory } from '../../requests/backend/updateConfig';
import { pingFactory } from '../../requests/backend/ping';
import { translateFactory } from '../../requests/backend/translate';
import { suggestLanguageFactory } from '../../requests/backend/suggestLanguage';
import { getTranslatorFeaturesFactory } from '../../requests/backend/getTranslatorFeatures';
import { getUserLanguagePreferencesFactory } from '../../requests/backend/getUserLanguagePreferences';
import { getAvailableTranslatorsFactory } from '../../requests/backend/translators/getAvailableTranslators';
import { getConfigFactory } from '../../requests/backend/getConfig';
import { setConfigFactory } from '../../requests/backend/setConfig';
import { resetConfigFactory } from '../../requests/backend/resetConfig';
import { clearCacheFactory } from '../../requests/backend/clearCache';
import { ttsRequestHandlers } from '../../requests/backend/tts';

// Auto translation
import { setSitePreferencesFactory } from '../../requests/backend/autoTranslation/sitePreferences/setSitePreferences';
import { getSitePreferencesFactory } from '../../requests/backend/autoTranslation/sitePreferences/getSitePreferences';
import { deleteSitePreferencesFactory } from '../../requests/backend/autoTranslation/sitePreferences/deleteSitePreferences';
import { getLanguagePreferencesFactory } from '../../requests/backend/autoTranslation/languagePreferences/getLanguagePreferences';
import { addLanguagePreferencesFactory } from '../../requests/backend/autoTranslation/languagePreferences/addLanguagePreferences';
import { deleteLanguagePreferencesFactory } from '../../requests/backend/autoTranslation/languagePreferences/deleteLanguagePreferences';

import { addTranslationFactory } from '../../requests/backend/translations/addTranslation';
import { findTranslationFactory } from '../../requests/backend/translations/findTranslation';
import { deleteTranslationFactory } from '../../requests/backend/translations/deleteTranslation';
import { getTranslationsFactory } from '../../requests/backend/translations/getTranslations';
import { clearTranslationsFactory } from '../../requests/backend/translations/clearTranslations';

import { addTranslatorFactory } from '../../requests/backend/translators/addTranslator';
import { deleteTranslatorFactory } from '../../requests/backend/translators/deleteTranslator';
import { updateTranslatorFactory } from '../../requests/backend/translators/updateTranslator';
import { getTranslatorsFactory } from '../../requests/backend/translators/getTranslators';
import { applyTranslatorsFactory } from '../../requests/backend/translators/applyTranslators';

import { historyRequestHandlersFactory } from '../../requests/backend/history';

import { getRecentUsedLanguagesFactory } from '../../requests/backend/recentUsedLanguages/getRecentUsedLanguages';
import { addRecentUsedLanguageFactory } from '../../requests/backend/recentUsedLanguages/addRecentUsedLanguage';

import { bergamotHandlersFactory } from '../../requests/backend/bergamot';

export const requestHandlers = [
	translateFactory,
	suggestLanguageFactory,
	getTranslatorFeaturesFactory,
	getUserLanguagePreferencesFactory,
	getAvailableTranslatorsFactory,
	clearCacheFactory,

	...ttsRequestHandlers,

	historyRequestHandlersFactory,

	bergamotHandlersFactory,

	getConfigFactory,
	setConfigFactory,
	resetConfigFactory,
	updateConfigFactory,

	getLanguagePreferencesFactory,
	addLanguagePreferencesFactory,
	deleteLanguagePreferencesFactory,
	setSitePreferencesFactory,
	getSitePreferencesFactory,
	deleteSitePreferencesFactory,

	addTranslationFactory,
	deleteTranslationFactory,
	findTranslationFactory,
	getTranslationsFactory,
	clearTranslationsFactory,

	addTranslatorFactory,
	deleteTranslatorFactory,
	updateTranslatorFactory,
	getTranslatorsFactory,
	applyTranslatorsFactory,

	getRecentUsedLanguagesFactory,
	addRecentUsedLanguageFactory,

	// Up ping last to give success response only when all request handlers is ready
	pingFactory,
];
