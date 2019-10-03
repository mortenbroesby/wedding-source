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
}

export interface IPayload {
  name: string;
  isAttending: string;
  message: string;
  songSuggestions: string;
  dietRestrictions: string;
}
