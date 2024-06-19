import prisma from '$lib/prisma';

export const load = (async() => {
    const result = await Prisma.post.findMany();

    return { post: result };
})