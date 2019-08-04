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

  [key: string]: any; // Permit untyped data from envConfig
}

let config: ConfigInterface = {
  api: {
    requestTimeout: 30000
  },
};

config = {
  ...config,
  ...envConfig
};

export default config;
