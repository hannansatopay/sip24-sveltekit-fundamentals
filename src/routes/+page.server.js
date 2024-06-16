import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load() {
  const posts = await prisma.post.findMany();
  return {
    posts
  };
}
