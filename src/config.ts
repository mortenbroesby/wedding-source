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
      "locale": "en-GB",
    },
    "fr": {
      "locale": "fr-FR",
    },
    "dk": {
      "locale": "dk-DK",
    },
  },

  metaOptions: [
    { "charset": "utf-8" },
    { "name": "viewport", "content": "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" },

    { "name": "description", "content": "Wedding info website for the wedding of Joséphine & Morten" },
    { "name": "keywords", "content": "wedding, josephine, morten, 2020, westerliefde, Amsterdam" },

    { "name": "author", "content": "Morten Broesby-Olsen" },
    { "name": "copyright", "content": "Morten Broesby-Olsen" },

    { "name": "robots", "content": "index,follow" },

    { "http-equiv": "cache-control", "content": "no-cache" },
    { "http-equiv": "expires", "content": "0" },

    { property: "og:title", content: "Wedding of Josephine Morten" },
    { property: "og:description", content: "Wedding info website for the wedding of Joséphine & Morten" },
    { property: "og:url", content: "https://josephinemorten.info/" },
    { property: "og:image", content: "" },
    { property: "og:type", content: "website" },

    { property: "og:site_name", content: "Wedding Josephine & Morten" },
    { property: "og:locale", content: "en_GB" },
    { property: "og:locale:alternate", content: "fr_FR" },
    { property: "og:locale:alternate", content: "dk_DK" },

    { property: "twitter:title", content: "Wedding of Josephine Morten" },
    { property: "twitter:description", content: "Wedding info website for the wedding of Joséphine & Morten" },
    { property: "twitter:image", content: "" },
    { property: "twitter:card", content: "summary" },
  ]
};

config = {
  ...config,
  ...envConfig
};

export default config;
