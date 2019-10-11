import Logger from "js-logger";
import config from "./config";

/**
 * [ Storage utility function ]

 Advantages:
  - version control (migration of data possible)
  - no need to JSON.stringify/parse data
  - saves with environment in storage-key (prevent cross-environment pollution)
 */

interface StorageItem {
  type: string;
  data: string;
  version: number;
}

const STORAGE_PREFIX = `${config.environment}-`;
const STORAGE_CURRENT_VERSION = 1;

export function setItem(keyName: string, keyValue: any): void {
  let dataToStore: StorageItem = {
    type: "string",
    data: "",
    version: STORAGE_CURRENT_VERSION
  };

  if (Array.isArray(keyValue)) {
    dataToStore.type = "array";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "object") {
    dataToStore.type = "object";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "boolean") {
    dataToStore.type = "boolean";
    dataToStore.data = JSON.stringify(keyValue);
  } else if (typeof keyValue === "number") {
    dataToStore.type = "number";
    dataToStore.data = `${keyValue}`;
  } else {
    dataToStore.type = "string";
    dataToStore.data = `${keyValue}`;
  }

  try {
    localStorage.setItem(`${STORAGE_PREFIX}-${keyName}`, JSON.stringify(dataToStore));
  } catch (error) {
    Logger.error("Local-storage: Error setting stored item: ", error);
  }
}

export function removeItem(keyName: string): any {
  const storageItem = localStorage.getItem(`${STORAGE_PREFIX}-${keyName}`);
  if (storageItem === undefined || storageItem === null) {
    return;
  }

  try {
    localStorage.removeItem(`${STORAGE_PREFIX}-${keyName}`);
  } catch (error) {
    Logger.error("Local-storage: Error clearing stored item: ", error);
  }
}

export function getItem(keyName: string): any {
  let returnedData: any = "";
  let storageItem: any = undefined;

  try {
    storageItem = localStorage.getItem(`${STORAGE_PREFIX}-${keyName}`);
  } catch (error) {
    Logger.error("Local-storage: Error retrieving stored item: ", error);
  }

  if (storageItem === undefined || storageItem === null) {
    return storageItem;
  } else {
    const storedData: StorageItem = JSON.parse(storageItem);

    // Guard against invalid storage format
    if (!storedData || typeof storedData.version !== "number") {
      Logger.error("Storage data has invalid format: ", storageItem);
    }

    // Guard against outdated stored content
    if (storedData.version === STORAGE_CURRENT_VERSION) {
      returnedData = parseStoredData(storedData);
    } else {
      returnedData = migrateStoredData(storedData);
    }
  }

  return returnedData;
}

function parseStoredData(storageItem: StorageItem) {
  if (storageItem.type === "array") {
    return JSON.parse(storageItem.data);
  } else if (storageItem.type === "object") {
    return JSON.parse(storageItem.data);
  } else if (storageItem.type === "boolean") {
    return Boolean(storageItem.data);
  } else if (storageItem.type === "number") {
    return Number(storageItem.data);
  } else if (storageItem.type === "string") {
    return String(storageItem.data);
  }
}

function migrateStoredData(storageItem: StorageItem) {
  // Reserved for future use, e.g. if you need to adjust data from one version to another.
  // Define old version, and what needs to migrate.

  if (storageItem.version === 1) {
    return parseStoredData(storageItem);
  }
}

/*************************************************/
/* UTILITY FUNCTIONS */
/*************************************************/
export function isEmptyString(string: string) {
  return (!string || 0 === string.length);
}

export function isNonEmptyString(str: string) {
  return !isEmptyString(str);
}

export function isDefined(value: any): boolean {
  return typeof value !== "undefined";
}

export function isUndefined(value: any): boolean {
  return typeof value === "undefined";
}

export function stringHasUpperCase(string: string) {
  return /[A-Z]/.test(string);
}

export function stringHasNumber(string: string) {
  return /\d/.test(string);
}

export function stringContainsOnlyLetters(string: string) {
  return /^[a-zA-Z]+$/.test(string);
}

export function isValidEmail(email: string = ""): boolean {
  if (isEmptyString(email)) {
    return false;
  }

  // https://davidcel.is/posts/stop-validating-email-addresses-with-regex/
  const regexMatchEmail: RegExp = /.+@.+\..+/i;
  return regexMatchEmail.test(email);
}

export function randomID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0;
    let v = c == "x" ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

export function getDeviceId() {
  let storedID = getItem("deviceID");
  if (storedID) {
    return storedID;
  }

  let deviceID = randomID();
  setItem("deviceID", deviceID);

  return deviceID;
}

export function getApplicationVersion() {
  // const releaseVersion = config.version;
  const releaseVersion = `1.0.0`;

  return `${releaseVersion}`;
}

export function randomValue() {
  return Math.floor(Math.random() * 100000000);
}

export function encrypt(value: any) {
  let result = "";

  for (let i = 0; i < value.length; i++) {
    if (i < value.length - 1) {
      result += value.charCodeAt(i) + 10;
      result += "-";
    } else {
      result += value.charCodeAt(i) + 10;
    }
  }

  return result;
}

export function decrypt(value: any) {
  let result = "";
  let array = value.split("-");

  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i] - 10);
  }

  return result;
}

export function parseEncrypted(input: string) {
  const decryptedConfig = decrypt(input);
  return JSON.parse(decryptedConfig);
}
