import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import es from "./translation/es.json";
import en from "./translation/en.json";

export const i18n = new I18n({
  es,
  en,
});

i18n.enableFallback = true;
i18n.defaultLocale = "en";
i18n.locale = Localization.getLocales()[0]?.languageCode ?? "en";
