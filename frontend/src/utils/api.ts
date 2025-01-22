import axiosInstance from './axiosConfig';
import { saveToIndexedDB } from './indexeddb';
import { dbTranslationFromUrl, formatData, urlFromType } from './types';

export async function fetchFromAPI<T>(url: string): Promise<T> {
  const response = await axiosInstance.get(url);
  const dbUrl = dbTranslationFromUrl[url];

  for (const item of response.data) {
    await saveToIndexedDB(dbUrl, item);
  }
  
  return response.data;
}

export async function saveToAPI<T>(data: T): Promise<T> {
  const response = await axiosInstance.post(urlFromType(data), formatData(data));

  for (const item of response.data) {
    await saveToIndexedDB(urlFromType(data), item);
  }
  return response.data;
}
