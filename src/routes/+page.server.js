import prisma from '$app/environment';

export const load = (async() => {
    const result = await prisma.Post.findMany();

    return {posts: result };
})