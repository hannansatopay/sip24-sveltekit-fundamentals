import prisma from '$lib/prisma.js';

export const load = (async() => {
    const result = await prisma.post.findMany();

    return { posts: result };
})