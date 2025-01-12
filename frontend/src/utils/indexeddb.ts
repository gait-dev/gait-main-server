import { openDB } from 'idb';
import { Office, Patient, Appointment } from '../utils/types';

const dbPromise = openDB('gait-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('offices')) {
      db.createObjectStore('offices', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('patients')) {
      db.createObjectStore('patients', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('appointments')) {
      db.createObjectStore('appointments', { keyPath: 'id' });
    }
  },
});

export async function saveToIndexedDB<T>(store: string, data: T): Promise<void> {
  const db = await dbPromise;
  await db.put(store, data);
}

export async function getFromIndexedDB<T>(store: string, id: number): Promise<T | undefined> {
  const db = await dbPromise;
  return db.get(store, id);
}

export async function getAllFromIndexedDB<T>(store: string): Promise<T[]> {
  const db = await dbPromise;
  return db.getAll(store);
}
