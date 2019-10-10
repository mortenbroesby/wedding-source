import Logger from "js-logger";
import Vue from "vue";
import VueI18n from "vue-i18n";
import config from "../config";
import _ from "lodash";

import { setItem, getItem } from "../utilities";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: config.defaultLanguage,
  messages: {}
});


type LocaleMessage = string | LocaleMessageObject | LocaleMessageArray;
interface LocaleMessageArray {
  [index: number]: LocaleMessage;
}

interface LocaleMessages {
  [key: string]: LocaleMessageObject;
}

interface LanguageConfig {
  culture: string;
  currency: string;
}

interface LanguageOptions {
  language: string;
  messages: LocaleMessageObject;
}

interface LocaleMessageObject {
  [key: string]: LocaleMessage;
}

class LocalisationService {
  defaultLanguage = config.defaultLanguage;
  activeLanguage = "";
  useSystemLocale: boolean = true;

  initBeforeApplicationLoad(): void {
    this.setLanguage(`${this.getFromStorage()}`, false);
  }

  initAfterApplicationLoad(locale: string): void {
    let language = locale.substr(0, 2);

    if (!this.exists(language)) {
      language = this.defaultLanguage;
    }

    let systemLanguage = getItem("systemLanguage");
    if (!systemLanguage || systemLanguage !== language) {
      setItem("systemLanguage", language);
      systemLanguage = language;
    }

    if (this.useSystemLocale) {
      this.setLanguage(systemLanguage, false);
    } else {
      this.setLanguage(this.defaultLanguage, false);
    }
  }

  setLanguage(language: string, isUserPreference: boolean = true): void {
    if (this.exists(language) && language !== this.activeLanguage) {
      const options = this.getOptions(language);

      this.activeLanguage = language;

      if (isUserPreference) {
        setItem("userLanguage", language);
      }

      i18n.locale = language;

      i18n.setLocaleMessage(language, options.messages);
    }
  }

  getActiveLanguage(): string {
    return this.activeLanguage || this.defaultLanguage;
  }

  getActiveLanguageConfiguration(): LanguageConfig {
    return this.getLangConfig(this.activeLanguage);
  }

  private getLangConfig(language: string): LanguageConfig {
    return config.languages[language];
  }

  private exists(language: string): boolean {
    const result = this.getLangConfig(language);
    return typeof result === "object";
  }

  public getObjectProperty(object: any, key: any) {
    const array = key.split(".");
    while (array.length && (object = object[array.shift()]));
    return object;
  }

  public translate(key: string, payload?: any) {
    return i18n.t(key, payload);
  }

  public translateManual(key: string, payload?: any): string {
    const messages = this.getOptions(this.activeLanguage || this.defaultLanguage).messages;
    let text = this.getObjectProperty(messages, key);
    if (payload) {
      for (const id in payload) {
        text = text.replace(`{${id}}`, payload[id]);
      }
    }
    return text;
  }

  private getFromStorage(): string | undefined {
    const userLanguage = getItem("userLanguage");
    const systemLanguage = getItem("systemLanguage");

    if (this.useSystemLocale) {
      return userLanguage || systemLanguage || this.defaultLanguage;
    } else {
      return userLanguage || this.defaultLanguage;
    }
  }

  loadJSON(language: string) {
    if (language === "dk") {
      return require(`./locale/dk.json`);
    } else if (language === "fr") {
      return require(`./locale/fr.json`);
    }

    return require(`./locale/en.json`);
  }

  private getOptions(language: string): LanguageOptions {
    const langConfig = this.getLangConfig(language);

    return {
      language: langConfig.culture,
      messages: this.loadJSON(language)
    };
  }
}

export let localisationService = new LocalisationService();

export const formatMessage = (key: string, payload?: any) => String(i18n.t(key, payload));

export const defaultLanguage = config.defaultLanguage;

export const defaultLocale = () => {
  const defaultLanguage = _.find(config.languages, (language: any, key: string) => key === config.defaultLanguage);
  if (defaultLanguage) {
    return defaultLanguage.locale;
  }

  return "en_GB";
};

export const activeLanguage = localisationService.getActiveLanguage();
