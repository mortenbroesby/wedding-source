import axios, { AxiosInstance } from "axios";
import config from "../config";

import appContent from "../content/index.json";

const { information, timeline } = appContent;

export function getInformationContent() {
  return information;
}

export function getTimelineContent() {
  return timeline;
}
