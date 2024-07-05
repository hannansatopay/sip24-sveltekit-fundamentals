import prisma from '$lib/prisma';

export const load = async () => {
    const result = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    return { posts: result };
};