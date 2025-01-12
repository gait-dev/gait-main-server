import axiosInstance from './axiosConfig';

export async function fetchFromAPI<T>(url: string): Promise<T> {
  const response = await axiosInstance.get(url);
  return response.data;
}

export async function saveToAPI<T>(url: string, data: T): Promise<T> {
  const response = await axiosInstance.post(url, data);
  return response.data;
}
