import axiosInstance from './axiosConfig';
import { saveToIndexedDB } from './indexeddb';
import { dbTranslationFromUrl } from './types';

export async function fetchFromAPI<T>(url: string): Promise<T> {
  const response = await axiosInstance.get(url);
  const dbUrl = dbTranslationFromUrl[url];

  if(dbUrl.includes(url)){
    for (const item of response.data) {
      await saveToIndexedDB(url, item);
    }
  }
  return response.data;
}

export async function saveToAPI<T>(url: string, data: T): Promise<T> {
  const response = await axiosInstance.post(url, data);

  for (const item of response.data) {
    await saveToIndexedDB(url, item);
  }
  return response.data;
}
