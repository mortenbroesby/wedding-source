/*************************************************/
/* INTERFACES & DEFINITIONS */
/*************************************************/

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
