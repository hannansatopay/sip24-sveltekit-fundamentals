import prisma from '$lib/prisma';

export const load = (async() => {
    const result = await prisma.post.findMany({orderBy: { id: 'desc' }})

    return { posts: result };
})