import React, { createContext, useContext, useMemo, useState } from "react";
import { i18n } from "./index";

export type SupportedLanguages = "es" | "en";

export type I18nService = {
  t: (key: string, options?: Record<string, any>) => string;
  changeLanguage: (lang: SupportedLanguages) => void;
  currentLanguage: SupportedLanguages;
  exists: (key: string) => boolean;
};

const defaultI18n: I18nService = {
  t: (key) => key,
  changeLanguage: () => {},
  currentLanguage: "en",
  exists: () => true,
};

const I18nContext = createContext<I18nService>(defaultI18n);

export const I18nProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [language, setLanguage] = useState<SupportedLanguages>(
    i18n.locale as SupportedLanguages,
  );

  const changeLanguage = (lang: SupportedLanguages) => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  const value = useMemo<I18nService>(
    () => ({
      t: i18n.t.bind(i18n),
      changeLanguage,
      currentLanguage: language,
      exists: (key: string) => i18n.t(key) !== key,
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18nService = () => useContext(I18nContext);
