import axios, { AxiosInstance } from "axios";
import config from "../config";

import appContent from "../content/index.json";

const { information } = appContent;

export function getInformation() {
  return information;
}
