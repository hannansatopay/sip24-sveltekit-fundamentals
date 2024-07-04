import prisma from '$lib/prisma';

export const load = (async() => {
    const result = await prisma.Post.findMany();

    return {posts: result };
})