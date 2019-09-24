import developmentConfig from "./config.development";
import productionConfig from "./config.production";

const environment = process.env.NODE_ENV || "production";
const envConfig = environment === "production"
  ? productionConfig
  : developmentConfig;

export interface ConfigInterface {
  api: {
    requestTimeout: number;
  };

  defaultLanguage: string;

  languages: {
    [lang in Langs]: {
      locale: string,
    }
  };

  [key: string]: any;
}

type Langs = "en" | "fr" | "dk";

let config: ConfigInterface = {
  api: {
    requestTimeout: 30000
  },

  defaultLanguage: "en",

  languages: {
    "en": {
      "locale": "en-US",
    },
    "fr": {
      "locale": "fr-FR",
    },
    "dk": {
      "locale": "dk-DK",
    },
  },
};

config = {
  ...config,
  ...envConfig
};

export default config;
