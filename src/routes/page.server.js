import prisma from '../lib/prisma';

export async function load() {
    const result = await prisma.post.findMany();
    return { posts: result };
}
