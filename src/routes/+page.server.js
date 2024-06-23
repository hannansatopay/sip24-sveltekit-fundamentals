import prisma from "$lib/prisma"

export const load = (async() => {
    const result = await prisma.post.findMany();
    result.reverse();

    return { posts : result };
})