import {Platform} from 'react-native';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import unescape from 'lodash/unescape';

import vi from 'translations/vi';

i18next
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'vi',
    resources: {
      vi: vi as any,
    },
    interpolation: {
      escapeValue: Platform.OS === 'ios' ? true : false, // not needed for react!!
      escape(str) {
        return unescape(str);
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18next;
