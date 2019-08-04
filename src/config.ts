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
      culture: string,
    }
  };

  [key: string]: any; // Permit untyped data from envConfig
}

type Langs = "en" | "fr" | "dk";

let config: ConfigInterface = {
  api: {
    requestTimeout: 30000
  },
  defaultLanguage: "en",
  languages: {
    "en": {
      "culture": "en-US",
    },
    "fr": {
      "culture": "fr-FR",
    },
    "dk": {
      "culture": "dk-DK",
    },
  },
};

config = {
  ...config,
  ...envConfig
};

export default config;
