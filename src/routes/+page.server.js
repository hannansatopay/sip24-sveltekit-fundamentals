import { prisma } from '$lib/prisma';

export async function load() {
  try {
    if (!prisma) {
      console.error('Prisma client is not initialized');
      return { posts: [] };
    }
    const posts = await prisma.post.findMany();
    return { posts };
  } catch (error) {
    console.error('Error loading posts:', error);
    return { posts: [] };
  }
}