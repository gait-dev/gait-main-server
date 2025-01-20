import { openDB } from 'idb';
import { dbElements } from '../utils/types';

const dbPromise = openDB('gait-db', 1, {
  upgrade(db) {
    dbElements.map((dbName) => {
      if (!db.objectStoreNames.contains(dbName)) {
        db.createObjectStore(dbName, { keyPath: 'id' });
      }
    })
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
