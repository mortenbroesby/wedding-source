import { InfoAction } from "../enums";

/*************************************************/
/* INTERFACES & DEFINITIONS */
/*************************************************/

export interface TimelineItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface InfoItem {
  id: string;
  title: string;
  image: string;
  description: string;
  buttons: InfoButton[];
}

export interface InfoButton {
  label: string;
  link: string;
  external: boolean;
  inactive: boolean;
  action: InfoAction;
}

export interface IPayload {
  name: string;
  isAttending: string;
  message: string;
  songSuggestions: string;
  dietRestrictions: string;
}

export interface INotification {
  title: string;
  body: string;
}
