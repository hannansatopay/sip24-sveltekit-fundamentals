// lib/db.js
import { openDB } from 'idb';

let dbPromise;

if (typeof window !== 'undefined') {
  dbPromise = openDB('craftlab-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('posts')) {
        db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}

export const getAllPosts = async () => {
  if (!dbPromise) return [];
  const db = await dbPromise;
  return db.getAll('posts');
};

export const addPost = async (post) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.add('posts', post);
};

export const deletePost = async (id) => {
  if (!dbPromise) return;
  const db = await dbPromise;
  await db.delete('posts', id);
};